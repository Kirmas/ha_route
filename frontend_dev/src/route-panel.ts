import "wired-card";
import {
  HassEntity
} from "home-assistant-js-websocket";

import {
  LitElement, 
  html, 
  css, 
  customElement, 
  property
} from "lit-element";

import {
  HomeAssistant
} from "../homeassistant-frontend/src/types";

import {
  CustomPanelInfo
} from "../homeassistant-frontend/src/data/panel_custom";

import {RouteInfo, fetchRouteDate} from "./data/helper"
import "./day-picker";
import "./entity-multiselect-picker";
import "./map";

@customElement("ha-panel-route")
class RoutePanel extends LitElement {
  @property({ attribute: false }) public  day: Date;
  @property({ attribute: false }) public routeData: Map<string, Array<RouteInfo>>;
  @property({ attribute: false }) public  _isLoading: boolean;
  @property({ attribute: false }) public  _entityIds: Array<string>;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public panel!: CustomPanelInfo;
  @property({ attribute: false }) public narrow: Boolean;
  @property({ attribute: false }) public entities: Map<string, string>;

  constructor() {
    super();
    this.day = new Date();    
    this.routeData = new Map();
  }

  shouldUpdate(changedProps) {
    if(changedProps.has("routeData"))
    {
      return !this._isLoading;
    }
    return super.shouldUpdate(changedProps);
  }

  getDistance(origin, destination) {
    // return distance in meters
    let lon1 = this.toRadian(origin[1]),
        lat1 = this.toRadian(origin[0]),
        lon2 = this.toRadian(destination[1]),
        lat2 = this.toRadian(destination[0]);

    let deltaLat = lat2 - lat1;
    let deltaLon = lon2 - lon1;

    let a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
  }

  toRadian(degree) {
      return degree*Math.PI/180;
  }

  async updateGPSHistory() {
    if(this._entityIds.length === 0){
      this.routeData = new Map();
      return;
    }
    this._isLoading = true;
    const stateHistory = await fetchRouteDate(
      this.hass, 
      this.day, 
      this._entityIds
    );
    if (!stateHistory) {
      this._isLoading = false;
      this.routeData = new Map();
      return;
    }    
    const prevRouteData = new Map(this.routeData);
    this.routeData = new Map();
    stateHistory.forEach(stateInfo => {
      if (stateInfo.length === 0) {
        return;
      }
      var prev = null; 
      var routes = new Array<RouteInfo>();
      for (let index = 0; index < stateInfo.length; index++) {
        if(stateInfo[index].state == ""){
          continue;
        }
        if(stateInfo[index].state === (prev ? prev.state : "")){
          continue;
        }

        if(stateInfo[index].attributes.lati == null || stateInfo[index].attributes.long == null){
          if(stateInfo[index].attributes.latitude == null || stateInfo[index].attributes.longitude == null){
            continue;
          }

          //backward compatibility    
          stateInfo[index].attributes.lati = stateInfo[index].attributes.latitude;
          stateInfo[index].attributes.long  = stateInfo[index].attributes.longitude;
        }

        if(index + 1 != stateInfo.length)
        {
          /*
          if(prev){
            var distance = this.getDistance(
              [prev.attributes.latitude, prev.attributes.longitude],
              [stateInfo[index].attributes.latitude, stateInfo[index].attributes.longitude]
            );
            if(distance < this.panel.config.mindst){
              //console.log(`${stateInfo[index].state} was skiped because distance(${distance}) < ${this.panel.config.mindst}`);
              continue;
            }
          }
          var deltaTime = (
            new Date(stateInfo[index + 1].last_changed).valueOf() - 
            new Date(stateInfo[index].last_changed).valueOf()
          ) / 1000 / 60;
          if(deltaTime < this.panel.config.mintime)
          {
            //console.log(`${stateInfo[index].state} was skiped because deltaTime(${deltaTime}) < ${this.panel.config.mintime}`);
            continue;
          }*/
        }
        routes.push(
          new RouteInfo(
            new Date(stateInfo[index].last_changed),
            stateInfo[index].attributes.lati, 
            stateInfo[index].attributes.long, stateInfo[index].state
          )
        );
        prev = stateInfo[index];
      }
      
      this.routeData.set(this.entities.get(stateInfo[0].entity_id), routes);
    });
    this._isLoading = false;
    this.requestUpdate("routeData", prevRouteData);
  }

  dateRangeChanged(ev) {
    this.day = new Date(ev.detail.date);
  }

  entityChanged(ev) {
    this._entityIds = [...ev.detail.date];
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    /*Convert data from object to Map*/
    this.entities = new Map(Object.entries(this.panel.config.entities));
    this._entityIds = Array.from(this.entities.keys());
  }

  updated(changedProps) {
    super.updated(changedProps);

    if (
      changedProps.has("_startDate") ||
      changedProps.has("_endDate") ||
      changedProps.has("_entityIds")
    ) {
      this.updateGPSHistory();
    }
  }

  render() {
    return html`
      <app-toolbar>
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div main-title>Route</div> <!--Localize this-->
      </app-toolbar>
      <div class="flex content">
        <div class="flex layout horizontal wrap">
          <ha-route-day-picker
            .hass=${this.hass}
            .date=${this.day}
            ?disabled=${this._isLoading}
            ?narrow = ${this.narrow}
            @change=${this.dateRangeChanged}
          ></ha-route-day-picker>
          <entity-multiselect-picker
            .hass=${this.hass}
            .entityIds=${this.entities}
            .selectedEntityIds=${this._entityIds}
            ?narrow = ${this.narrow}
            @change=${this.entityChanged}
          ></entity-multiselect-picker>
        </div>
      </div>
      <ha-route-map
        .hass=${this.hass}
        .routeData=${this.routeData}
        ?narrow = ${this.narrow}
      ></ha-route-map>
  `;
  }

  static get styles() {
    return [
      css`
        app-toolbar {
          background-color: var(--app-header-background-color);
          height: var(--header-height);
        }

        .layout.horizontal{
          display: flex;
          flex-direction: row;
        }

        .layout.wrap {
          flex-wrap: wrap;
        }
        
        .content {
          padding: 0 16px 16px;
        }
      `,
    ];
  }
}
