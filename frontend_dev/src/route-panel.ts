import "wired-card";
import {
  HassEntity
} from "home-assistant-js-websocket";

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
  CustomPanelInfo
} from "../homeassistant-frontend/src/data/panel_custom";

import {RouteInfo, fetchRouteDate, fetchEntityById} from "./data/helper"
import "./day-picker";
import "./entity-multiselect-picker";
import "./map";

@customElement("ha-panel-route")
class RoutePanel extends LitElement {
  @property({ attribute: false }) public  day: Date;
  @property({ attribute: false }) public routeData: Map<HassEntity, Array<RouteInfo>>;
  @property({ attribute: false }) public  _isLoading: boolean;
  @property({ attribute: false }) public  _entityIds: Array<HassEntity>;
  @property({ attribute: false }) public entities: Array<HassEntity>;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public panel!: CustomPanelInfo;
  @property({ attribute: false }) public narrow: Boolean;

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
      
      console.log("Start get data for:");
      console.log(this.entities.find(entity => entity.entity_id == stateInfo[0].entity_id));

      for (let index = 0; index < stateInfo.length;) {        
        console.log("index=" + index);
        if(stateInfo[index].attributes.latitude == null || stateInfo[index].attributes.longitude == null){
          stateInfo.splice(index, 1);
          console.log("was removed because no data");
          continue;
        }
        if(index > 0)
        {
          console.log("index > 0");
          var distance = this.getDistance(
            [stateInfo[index - 1].attributes.latitude, stateInfo[index - 1].attributes.longitude],
            [stateInfo[index].attributes.latitude, stateInfo[index].attributes.longitude]
          );
          console.log("distance = "+distance + "gps_accuracy" + stateInfo[index].attributes.gps_accuracy);
          //180 looks like WI-FI geo data. Could be realy wrong.
          if(distance >= this.panel.config.mindst && stateInfo[index].attributes.gps_accuracy > 150)
          {
            console.log("was removed because distance > 250 and gps_accuracy> 150");
            stateInfo.splice(index, 1);
            continue;
          }

          console.log("prev gps_accuracy" + stateInfo[index - 1].attributes.gps_accuracy);
          if(stateInfo[index - 1].attributes.gps_accuracy >= distance && stateInfo[index].attributes.gps_accuracy >= distance){
            if(stateInfo[index - 1].attributes.gps_accuracy > stateInfo[index].attributes.gps_accuracy){
              console.log("intersect revrite previus");
              stateInfo[index - 1].attributes.gps_accuracy = stateInfo[index].attributes.gps_accuracy;
              stateInfo[index - 1].attributes.latitude = stateInfo[index].attributes.latitude;
              stateInfo[index - 1].attributes.longitude = stateInfo[index].attributes.longitude;
            }

            console.log("was removed because intersect");
            stateInfo.splice(index, 1);
            --index;
            continue;
          }

          if(index > 1){
            console.log("index > 1");
            var distance2 = this.getDistance(
              [stateInfo[index - 1].attributes.latitude, stateInfo[index - 1].attributes.longitude],
              [stateInfo[index - 2].attributes.latitude, stateInfo[index - 2].attributes.longitude]
            );
            var distance3 = this.getDistance(
              [stateInfo[index - 2].attributes.latitude, stateInfo[index - 2].attributes.longitude],
              [stateInfo[index].attributes.latitude, stateInfo[index].attributes.longitude]
            );
            console.log("distance2 = "+distance2 + " distance3=" + distance3);
            //move forvard check
            if(distance3 < distance2 && distance3 < distance){
              var timeDelta = (new Date(stateInfo[index].last_updated).valueOf() -
                new Date(stateInfo[index - 1].last_updated).valueOf()
              ) / 1000 / 60;
              if(timeDelta < this.panel.config.mintime){
                console.log("was removed because not move forward");
                stateInfo.splice(index - 1, 1);
                --index;
                continue;
              }
            }

            if(distance >= this.panel.config.mindst && distance2 >= this.panel.config.mindst && distance3 < this.panel.config.mindst){
              console.log("was removed because strange teleport");
              stateInfo.splice(index - 1, 1);
              --index;
              continue;
            }
          }
        }
        console.log("not removed");
        ++index;
      }

      for (let index = 0; index < stateInfo.length; index++) {
        routes.push(
          new RouteInfo(
            new Date(stateInfo[index].last_updated),
            stateInfo[index].attributes.latitude, 
            stateInfo[index].attributes.longitude, 
            stateInfo[index].attributes.gps_accuracy,
            prev ? "Distance = " + this.getDistance(
              [prev.attributes.latitude, prev.attributes.longitude],
              [stateInfo[index].attributes.latitude, stateInfo[index].attributes.longitude]
            ).toString() : ""
          )
        );

        if(routes.length > 1)
        {
          routes[routes.length - 2].timeDelta = (routes[routes.length - 1].time.valueOf() - routes[routes.length - 2].time.valueOf()) / 1000 / 60;
        }

        prev = stateInfo[index];
      }
      
      console.log(routes);
      this.routeData.set(this.entities.find(entity => entity.entity_id == stateInfo[0].entity_id), routes);
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

  async buildEntities() {
    this.entities = [];
    for (let index = 0; index < this.panel.config.entities.length; index++) {
      this.entities.push(await fetchEntityById(this.hass, this.panel.config.entities[index]));
    }
    this._entityIds = [...this.entities];
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.buildEntities();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if(this.entities == null || this._entityIds == null){
      return;
    }

    if (
      changedProps.has("day") ||
      changedProps.has("_entityIds")
    ) {
      this.updateGPSHistory();
    }
  }

  render() {
    if(this.entities == null)
    {
      return "";
    }
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
            .entities=${this.entities}
            .selectedEntityIds=${this._entityIds}
            ?narrow = ${this.narrow}
            @change=${this.entityChanged}
          ></entity-multiselect-picker>
        </div>
      </div>
      <ha-route-map
        .hass=${this.hass}
        .routeData=${this.routeData}
        .mintime=${this.panel.config.mintime}
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
