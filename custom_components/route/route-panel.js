import "https://unpkg.com/wired-card@2.1.0/lib/wired-card.js?module";
import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class RouteInfo {
  latitude = 0.0;
  longitude = 0.0;
  street = "";
}

class RoutePanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
    };
  }

  routeData = new Map();
  startTime = new Date(2020, 11, 11, 0, 0, 0);
  endTime = new Date(2020, 11, 12, 11, 59, 59);
  entityId = "sensor.virtual_person_igor_pakhomov,sensor.virtual_person_iuliia_pakhomova";

  async UpdateGPSHistory() {
    const stateHistory = await this.hass.callApi(
      "GET",
      `history/period/${this.startTime.toISOString()}?end_time=${this.endTime.toISOString()}&filter_entity_id=${this.entityId}`
    );

    this.routeData = new Map();

    if (!stateHistory) {
      return;
    }

    //console.log(stateHistory);
    
    stateHistory.forEach((stateInfo) => {
      if (stateInfo.length === 0) {
        return;
      }

      //console.log(stateInfo);

      var prevState = ""; 
      var routes = new Map();
      stateInfo.forEach((state) => {
        if(state.state != "" && state.state !== prevState)
        {
          //console.log(state);
          routes.set(new Date(state.last_changed), state.state);
          prevState = state.state;
        }
      })

      this.routeData.set(stateInfo[0].entity_id, routes);
    });

  //  console.log(this.routeData);
  }

  dateRangeChanged(ev) {
    this.startDate = ev.detail.startDate;
    const endDate = ev.detail.endDate;
    if (endDate.getHours() === 0 && endDate.getMinutes() === 0) {
      endDate.setDate(endDate.getDate() + 1);
      endDate.setMilliseconds(endDate.getMilliseconds() - 1);
    }
    this._endDate = endDate;
  }

  render() {
    this.UpdateGPSHistory();

    return html`
    <ha-app-layout>
    <app-header slot="header" fixed>
      <app-toolbar>
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div main-title>${this.hass.localize("panel.route")}</div>
      </app-toolbar>
    </app-header>
    dsds
    <div class="flex content">
      <div class="flex layout horizontal wrap">
        <ha-date-range-picker
          .hass=${this.hass}
          ?disabled=false
          .startDate=${this.startTime}
          .endDate=${this.endTime}
          .ranges=${this._ranges}
          @change=${this.dateRangeChanged}
        ></ha-date-range-picker>
      </div>
    </div>
  </ha-app-layout>
`;
  }

  connectedCallback() {
    super.connectedCallback();
    //this.loadMap();
  }

  async setupLeafletMap(
    darkMode,
    draw = false
  ){
    if (!mapElement.parentNode) {
      throw new Error("Cannot setup Leaflet map on disconnected element");
    }
    // eslint-disable-next-line
    const Leaflet = (await import("https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.js"));
  //    .default as LeafletModuleType;
    Leaflet.Icon.Default.imagePath = "/static/images/leaflet/images/";
  
    if (draw) {
      await import("leaflet-draw");
    }
  
    const map = Leaflet.map(mapElement);
    const style = document.createElement("link");
    style.setAttribute("href", "/static/images/leaflet/leaflet.css");
    style.setAttribute("rel", "stylesheet");
    mapElement.parentNode.appendChild(style);
    map.setView([52.3731339, 4.8903147], 13);
  
    const tileLayer = createTileLayer(Leaflet, Boolean(darkMode)).addTo(map);
  
    return [map, Leaflet, tileLayer];
  };

  async loadMap() {
    this._darkMode = this.hass.themes.darkMode;
    [this._map, this.Leaflet, this._tileLayer] = await this.setupLeafletMap(
      this._darkMode
    );
    this.drawEntities(this.hass);
    this._map.invalidateSize();
    this.fitMap();
  }

  /*static get styles() {
    return css`
      :host {
        background-color: #fafafa;
        padding: 16px;
        display: block;
      }
      wired-card {
        background-color: white;
        padding: 16px;
        display: block;
        font-size: 18px;
        max-width: 600px;
        margin: 0 auto;
      }
    `;
  }*/
}
customElements.define("ha-panel-route", RoutePanel);


//import "@polymer/app-layout/app-toolbar/app-toolbar";
//import { html } from "@polymer/polymer/lib/utils/html-tag";
/* eslint-plugin-disable lit */
//import { PolymerElement } from "@polymer/polymer/polymer-element";
//import {
//  setupLeafletMap,
//  replaceTileLayer,
//} from "../../common/dom/setup-leaflet-map";
//import { computeStateDomain } from "../../common/entity/compute_state_domain";
//import { computeStateName } from "../../common/entity/compute_state_name";
//import { navigate } from "../../common/navigate";
//import "../../components/ha-icon";
//import "../../components/ha-menu-button";
//import { defaultRadiusColor } from "../../data/zone";
//import LocalizeMixin from "../../mixins/localize-mixin";
//import "./ha-entity-marker";
//import "../../styles/polymer-ha-style";
//import "../../layouts/ha-app-layout";

/*
 * @appliesMixin LocalizeMixin
 */
/*class HaPanelMap2 extends LocalizeMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="ha-style">
        #map {
          height: calc(100vh - var(--header-height));
          width: 100%;
          z-index: 0;
          background: inherit;
        }

        .icon {
          color: var(--primary-text-color);
        }
      </style>

      <ha-app-layout>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button
              hass="[[hass]]"
              narrow="[[narrow]]"
            ></ha-menu-button>
            <div main-title>[[localize('panel.map')]]</div>
            <template is="dom-if" if="[[computeShowEditZone(hass)]]">
              <ha-icon-button
                icon="hass:pencil"
                on-click="openZonesEditor"
              ></ha-icon-button>
            </template>
          </app-toolbar>
        </app-header>
        <div id="map"></div>
      </ha-app-layout>
    `;
  }

  static get properties() {
    return {
      hass: {
        type: Object,
        observer: "drawEntities",
      },
      narrow: Boolean,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadMap();
  }

  async loadMap() {
    this._darkMode = this.hass.themes.darkMode;
    [this._map, this.Leaflet, this._tileLayer] = await setupLeafletMap(
      this.$.map,
      this._darkMode
    );
    this.drawEntities(this.hass);
    this._map.invalidateSize();
    this.fitMap();
  }

  disconnectedCallback() {
    if (this._map) {
      this._map.remove();
    }
  }

  computeShowEditZone(hass) {
    return !__DEMO__ && hass.user.is_admin;
  }

  openZonesEditor() {
    navigate(this, "/config/zone");
  }

  fitMap() {
    let bounds;

    if (this._mapItems.length === 0) {
      this._map.setView(
        new this.Leaflet.LatLng(
          this.hass.config.latitude,
          this.hass.config.longitude
        ),
        14
      );
    } else {
      bounds = new this.Leaflet.latLngBounds(
        this._mapItems.map((item) => item.getLatLng())
      );
      this._map.fitBounds(bounds.pad(0.5));
    }
  }

  drawEntities(hass) {*/
    /* eslint-disable vars-on-top */
/*    const map = this._map;
    if (!map) return;

    if (this._darkMode !== this.hass.themes.darkMode) {
      this._darkMode = this.hass.themes.darkMode;
      this._tileLayer = replaceTileLayer(
        this.Leaflet,
        map,
        this._tileLayer,
        this.hass.themes.darkMode
      );
    }

    if (this._mapItems) {
      this._mapItems.forEach(function (marker) {
        marker.remove();
      });
    }
    const mapItems = (this._mapItems = []);

    if (this._mapZones) {
      this._mapZones.forEach(function (marker) {
        marker.remove();
      });
    }
    const mapZones = (this._mapZones = []);

    Object.keys(hass.states).forEach((entityId) => {
      const entity = hass.states[entityId];

      if (
        entity.state === "home" ||
        !("latitude" in entity.attributes) ||
        !("longitude" in entity.attributes)
      ) {
        return;
      }

      const title = computeStateName(entity);
      let icon;

      if (computeStateDomain(entity) === "zone") {
        // DRAW ZONE
        if (entity.attributes.passive) return;

        // create icon
        let iconHTML = "";
        if (entity.attributes.icon) {
          const el = document.createElement("ha-icon");
          el.setAttribute("icon", entity.attributes.icon);
          iconHTML = el.outerHTML;
        } else {
          const el = document.createElement("span");
          el.innerHTML = title;
          iconHTML = el.outerHTML;
        }

        icon = this.Leaflet.divIcon({
          html: iconHTML,
          iconSize: [24, 24],
          className: "icon",
        });

        // create marker with the icon
        mapZones.push(
          this.Leaflet.marker(
            [entity.attributes.latitude, entity.attributes.longitude],
            {
              icon: icon,
              interactive: false,
              title: title,
            }
          ).addTo(map)
        );

        // create circle around it
        mapZones.push(
          this.Leaflet.circle(
            [entity.attributes.latitude, entity.attributes.longitude],
            {
              interactive: false,
              color: defaultRadiusColor,
              radius: entity.attributes.radius,
            }
          ).addTo(map)
        );

        return;
      }

      // DRAW ENTITY
      // create icon
      const entityPicture = entity.attributes.entity_picture || "";
      const entityName = title
        .split(" ")
        .map(function (part) {
          return part.substr(0, 1);
        })
        .join("");*/
      /* Leaflet clones this element before adding it to the map. This messes up
         our Polymer object and we can't pass data through. Thus we hack like this. */
/*      icon = this.Leaflet.divIcon({
        html:
          "<ha-entity-marker entity-id='" +
          entity.entity_id +
          "' entity-name='" +
          entityName +
          "' entity-picture='" +
          entityPicture +
          "'></ha-entity-marker>",
        iconSize: [45, 45],
        className: "",
      });

      // create market with the icon
      mapItems.push(
        this.Leaflet.marker(
          [entity.attributes.latitude, entity.attributes.longitude],
          {
            icon: icon,
            title: computeStateName(entity),
          }
        ).addTo(map)
      );

      // create circle around if entity has accuracy
      if (entity.attributes.gps_accuracy) {
        mapItems.push(
          this.Leaflet.circle(
            [entity.attributes.latitude, entity.attributes.longitude],
            {
              interactive: false,
              color: "#0288D1",
              radius: entity.attributes.gps_accuracy,
            }
          ).addTo(map)
        );
      }
    });
  }
}*/

//customElements.define("ha-panel-route", HaPanelMap2);