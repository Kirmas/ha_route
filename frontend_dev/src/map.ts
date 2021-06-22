import {
  LitElement, 
  html, 
  css
} from "lit";

import {
  customElement, 
  property
} from "lit/decorators.js";

import {
  HomeAssistant
} from "../homeassistant-frontend/src/types";

import {
  setupLeafletMap,
} from "../homeassistant-frontend/src/common/dom/setup-leaflet-map";

import "./route-entity-marker";
import {antPath} from 'leaflet-ant-path';
import { HassEntity } from "home-assistant-js-websocket";
import { RouteInfo } from "./data/helper";

@customElement("ha-route-map")
export class MapElement extends LitElement {
  @property({ attribute: false }) public markers: any[];
  @property({ attribute: false }) public polyLines: any[];
  @property({ attribute: false }) public map: any;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public routeData: Map<HassEntity, Array<RouteInfo>>;
  @property({ attribute: false }) public mintime: number;
  
  Leaflet: any;
  private _darkMode: boolean;
  loadMapPromise: Promise<void>;
  tileLayer: any;

  constructor() {
    super();
    this.markers = [];
    this.polyLines = [];
  }


  fitMap() {
    let bounds;

    if (this.markers.length === 0) {
      this.map.setView(
        new this.Leaflet.LatLng(
          this.hass.config.latitude,
          this.hass.config.longitude
        ),
        14
      );
    } else {
      bounds = new this.Leaflet.latLngBounds(
        this.markers.map((item) => item.getLatLng())
      );
      this.map.fitBounds(bounds.pad(0.5));
    }
  }

  async loadMap() {
    this._darkMode = this.hass.themes.darkMode;
    var mapElement = this.shadowRoot.getElementById("map");
    [this.map, this.Leaflet, this.tileLayer] = await setupLeafletMap(
      mapElement,
      this._darkMode
    );

    //this.drawEntities(this.hass);
    this.map.invalidateSize();
    this.fitMap();
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.loadMapPromise = this.loadMap();
  }

  ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }
    return rgb;
  }

  hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  async updateMapItems() {
    await this.loadMapPromise;

    for (const [valueKey, valueArray] of this.routeData.entries()) {
      var randomColor = this.hslToHex(Math.random() * 360, 100, 50);
      var prevValue:Array<RouteInfo> = [];
      var n = 0;
      
      for (const value of valueArray) {
        if(prevValue.length == null || value.timeDelta > this.mintime || value.timeDelta < 0)
        {
          var marker = this.Leaflet.marker([value.latitude, value.longitude], {
            icon: this.Leaflet.divIcon({
              html: `
                <route-entity-marker
                  entity-id="${valueKey.entity_id}"
                  entity-name="${valueKey.attributes.friendly_name}"
                  entity-picture="${valueKey.attributes.entity_picture}"
                  entity-color="${randomColor}"
                  }
                ></route-entity-marker>
              `,
              iconSize: [48, 48],
              className: "",
            }),
            title: `${n} ${value.time.toLocaleTimeString()} ${value.debug_info}`,
          }).bindTooltip(`${n++} ${value.timeDelta}`, 
          {
              permanent: true, 
              direction: 'top'
          })
          
          // create circle around if entity has accuracy
          if (value.gps_accuracy) {
            var marker2 = this.Leaflet.circle([value.latitude, value.longitude], {
                interactive: false,
                color: randomColor,
                radius: value.gps_accuracy,
              });
              marker2.addTo(this.map);
              this.markers.push(marker2);
          }

          marker.addTo(this.map);
          this.markers.push(marker);
          prevValue.push(value);
          if(prevValue.length > 1){
            var cordinates:string = "";
            for(var prev of prevValue)
            {
              cordinates += prev.longitude + "," + prev.latitude + ";";
            }
            cordinates = cordinates.slice(0, -1);
            let routesJSON = await new Promise<any>(resolve => {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${cordinates}?overview=false&geometries=geojson&steps=true`, true);
              xhr.responseType = 'json';
  
              xhr.onload = function() {
                resolve(xhr.response);
              };
              xhr.send();
            });

            var cord = [[prevValue[0].latitude, prevValue[0].longitude]];

            routesJSON.routes[0].legs.map(leg => leg.steps.map(step =>
              step.geometry.coordinates.map(coordinate => 
                cord.push([coordinate[1], coordinate[0]])
              )
            ));

            cord.push([prevValue[prevValue.length-1].latitude, prevValue[prevValue.length-1].longitude])
  
            var polyLine = antPath(cord, { 
              "delay": 500,
              "dashArray": [
                10,
                20
              ],
              "weight": 5,
              "color": 	"#ffffff",
              "pulseColor": randomColor,
              "paused": false,
              "reverse": false,
            });
  
            polyLine.addTo(this.map);
            this.polyLines.push(polyLine);
            prevValue = prevValue.slice(-1);
          }
        }
        else
        {/*
          var marker = this.Leaflet.marker([value.latitude, value.longitude], {
            title: `${n} ${value.time.toLocaleTimeString()} ${value.debug_info}`,
          }).bindTooltip(`${n++} ${value.timeDelta}`, 
          {
              permanent: true, 
              direction: 'top'
          })
          // create circle around if entity has accuracy
          if (value.gps_accuracy) {
            var marker2 = this.Leaflet.circle([value.latitude, value.longitude], {
                interactive: false,
                color: randomColor,
                radius: value.gps_accuracy,
              });
              marker2.addTo(this.map);
              this.markers.push(marker2);
          }
          
          marker.addTo(this.map);
          this.markers.push(marker);*/
          prevValue.push(value);
        }
      }
    }

    this.fitMap();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if(changedProps.has("routeData"))
    {
      if(changedProps.get("routeData") == null || changedProps.get("routeData").size == 0)
      {
        if(this.map)
        {
          this.map.invalidateSize();
        }
      }

      this.markers.forEach(function (marker) {
        marker.remove();
      });
      this.markers = [];

      this.polyLines.forEach(function (polyLine) {
        polyLine.remove();
      });
      this.polyLines = [];

      if(this.routeData.size != 0){
        this.updateMapItems();
      }
    }
  }
  
  render(){
    return html`
      ${this.routeData.size == 0 ?
        html`
          <div class="container no-entries" dir="ltr">
            ${this.hass.localize("ui.components.data-table.no-data")}
          </div>
        `:html``
      }
    <div id="map" ?hidden=${this.routeData.size == 0}></div>`;
  }

  static get styles(){
    return css`
      :host {
        --config-height: 62px;
        --config-padding: 16px;
      }

      :host([narrow]) {
        --config-height: 124px;
      }

      .no-entries {
        text-align: center;
        color: var(--secondary-text-color);
      }

      #map { 
        height: calc(100vh - var(--header-height) - var(--config-height) - var(--config-padding));
        width: 100%;
        z-index: 0;
        background: inherit;
      }

      @-webkit-keyframes leaflet-ant-path-animation {
        from {
          stroke-dashoffset: 100%; }
        to {
          stroke-dashoffset: 0%; } }
      
      @-moz-keyframes leaflet-ant-path-animation {
        from {
          stroke-dashoffset: 100%; }
        to {
          stroke-dashoffset: 0%; } }
      
      @-ms-keyframes leaflet-ant-path-animation {
        from {
          stroke-dashoffset: 100%; }
        to {
          stroke-dashoffset: 0%; } }
      
      @-o-keyframes leaflet-ant-path-animation {
        from {
          stroke-dashoffset: 100%; }
        to {
          stroke-dashoffset: 0%; } }
      
      @keyframes leaflet-ant-path-animation {
        from {
          stroke-dashoffset: 100%; }
        to {
          stroke-dashoffset: 0%; } }
      
      path.leaflet-ant-path {
        fill: none;
        -webkit-animation: 20s linear infinite leaflet-ant-path-animation;
        -moz-animation: 20s linear infinite leaflet-ant-path-animation;
        -ms-animation: 20s linear infinite leaflet-ant-path-animation;
        -o-animation: 20s linear infinite leaflet-ant-path-animation;
        animation: 20s linear infinite leaflet-ant-path-animation; }
        path.leaflet-ant-path__hardware-acceleration {
          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
          -ms-transform: translateZ(0);
          -o-transform: translateZ(0);
          transform: translateZ(0); }
        path.leaflet-ant-path__reverse {
          -webkit-animation-direction: reverse;
          -moz-animation-direction: reverse;
          -ms-animation-direction: reverse;
          -o-animation-direction: reverse;
          animation-direction: reverse; }
    `;
  }
}
