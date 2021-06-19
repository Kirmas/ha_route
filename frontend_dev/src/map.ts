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

import {antPath} from 'leaflet-ant-path';

@customElement("ha-route-map")
export class MapElement extends LitElement {
  @property({ attribute: false }) public markers: any[];
  @property({ attribute: false }) public polyLines: any[];
  @property({ attribute: false }) public map: any;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public routeData: Map<string, Array<any>>;
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

  async updateMapItems() {
    await this.loadMapPromise;

    for (const [valueKey, valueArray] of this.routeData.entries()) {
      var randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
      var prevValue = null;
      var n = 0;
      
      for (const value of valueArray) {
        var marker = this.Leaflet.marker([value.latitude, value.longitude], {
          title: `${n} ${valueKey} ${value.time} ${value.street}`,
        });
        ++n;
        marker.addTo(this.map);
        this.markers.push(marker);

        if(prevValue){
          var coordinates = [[prevValue.latitude, prevValue.longitude], [value.latitude, value.longitude]];
          let routesJSON = await new Promise<any>(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${coordinates[0][1]},${coordinates[0][0]};${coordinates[1][1]},${coordinates[1][0]}?overview=false&geometries=geojson&steps=true`, true);
            xhr.responseType = 'json';

            xhr.onload = function() {
              resolve(xhr.response);
            };
            xhr.send();
          });
          
          routesJSON.routes[0].legs[0].steps.map(step =>
            step.geometry.coordinates.map(coordinate => 
              coordinates.splice(coordinates.length - 1, 0, [coordinate[1], coordinate[0]])
            )
          );

          var polyLine = antPath(coordinates, { 
            "delay": 500,
            "dashArray": [
              10,
              20
            ],
            "weight": 5,
            "color": randomColor,
            "pulseColor": this.ColorLuminance(randomColor, 0.5),
            "paused": false,
            "reverse": false,
          });

          polyLine.addTo(this.map);
          this.polyLines.push(polyLine);
        }

        prevValue = value;
      };
    };

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
