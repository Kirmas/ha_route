import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

import {
  Control,
  DomEvent,
  DomUtil,
  Evented,
  LatLng,
  LatLngBounds,
  Layer,
  FeatureGroup,
  Polygon,
  Polyline,
  Marker,
  Browser,
  Icon,
  TileLayer,
  Map
} from "https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.esm.js?module"

export class MapElement extends LitElement {
  constructor() {
    super();
    this.markers = [];
    this.polyLines = [];
  }

  static get properties() {
    return {
      hass: { type: Object },
      routeData: { type: Map },
    };
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    Icon.Default.imagePath = "/static/images/leaflet/images/";
    var mapElement = this.shadowRoot.getElementById("map");
    this.map = new Map(mapElement);
    const style = document.createElement("link");
    style.setAttribute("href", "/static/images/leaflet/leaflet.css");
    style.setAttribute("rel", "stylesheet");
    mapElement.parentNode.appendChild(style);
    this.map.setView([this.hass.config.latitude, this.hass.config.longitude], 14);
    var layer = new TileLayer(`https://{s}.basemaps.cartocdn.com/${
      this.hass.themes.darkMode? "dark_all" : "light_all"
    }/{z}/{x}/{y}${Browser.retina? "@2x.png" : ".png"}`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 20,
    });
    layer.addTo(this.map);

    this.map.invalidateSize();
  }

  async updateMapItems() {
    for (const [valueKey, valueMap] of this.routeData.entries()) {
      var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      var prevValue = null;
      var n = 0;
      
      for (const [key, value] of valueMap.entries()) {
        var marker = new Marker([value.latitude, value.longitude], {
          title: `${n} ${valueKey} ${key} ${value.street}`,
        });
        ++n;
        marker.addTo(this.map);
        this.markers.push(marker);

        if(prevValue){
          var coordinates = [[prevValue.latitude, prevValue.longitude], [value.latitude, value.longitude]];
          let routesJSON = await new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${coordinates[0][1]},${coordinates[0][0]};${coordinates[1][1]},${coordinates[1][0]}?overview=false&geometries=geojson&steps=true`, true);
            xhr.responseType = 'json';

            xhr.onload = function(e) {
              resolve(xhr.response);
            };
            xhr.send();
          });

          routesJSON.routes[0].legs[0].steps.map(step =>
            step.geometry.coordinates.map(coordinate => 
              coordinates.splice(coordinates.length - 1, 0, [coordinate[1], coordinate[0]])
            )
          );

          var polyLine = new Polyline(coordinates, { 
            color: randomColor 
          });
          polyLine.addTo(this.map);
          this.polyLines.push(polyLine);
        }

        prevValue = value;
      };
    };
  }

  updated(changedProps) {
    super.updated(changedProps);
    if(changedProps.has("routeData"))
    {
      if(changedProps.get("routeData") == null || changedProps.get("routeData").size == 0)
      {
        this.map.invalidateSize();
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
    `;
  }
}

customElements.define("ha-route-map",  MapElement);
