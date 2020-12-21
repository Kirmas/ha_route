import "https://unpkg.com/wired-card@2.1.0/lib/wired-card.js?module";
import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

import "./day-picker.js";
import "./entity-multiselect-picker.js";
import "./map.js";

class RouteInfo {
  constructor(latitude, longitude, street){
    this.latitude = latitude;
    this.longitude = longitude;
    this.street = street;
  }
}

class RoutePanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
      routeData: { type: Map },
      _startDate: { type: Date },
      _endDate: { type: Date },
      _entityIds: { type: Array },
    };
  }

  constructor() {
    super();

    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    this._startDate = start;

    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    this._endDate = end;
    
    this.routeData = new Map();
  }

  shouldUpdate(changedProps) {
    if(changedProps.has("routeData"))
    {
      return !this._isLoading;
    }
    return super.shouldUpdate(changedProps);
  }

  async updateGPSHistory() {
    if(this._entityIds.length === 0){
      this.routeData = new Map();
      return;
    }

    this._isLoading = true;
    const stateHistory = await this.hass.callApi(
      "GET",
      `history/period/${this._startDate.toISOString()}?end_time=${this._endDate.toISOString()}&filter_entity_id=${this._entityIds.join()}`
    );

    if (!stateHistory) {
      this._isLoading = false;
      this.routeData = new Map();
      return;
    }
    
    const prevRouteData = new Map(this.routeData);
    this.routeData = new Map();

    stateHistory.forEach((stateInfo) => {
      if (stateInfo.length === 0) {
        return;
      }

      var prevState = ""; 
      var routes = new Map();
      stateInfo.forEach((ob_state) => {
        if(ob_state.state != "" && ob_state.state !== prevState)
        {
          routes.set(new Date(ob_state.last_changed), new RouteInfo(ob_state.attributes.latitude, ob_state.attributes.longitude, ob_state.state));
          prevState = ob_state.state;
        }
      })

      this.routeData.set(this.panel.config.entities.get(stateInfo[0].entity_id), routes);
    });    
    this._isLoading = false;
    this.requestUpdate("routeData", prevRouteData);
  }

  dateRangeChanged(ev) {
    ev.detail.date.setHours(0);
    ev.detail.date.setMinutes(0);
    ev.detail.date.setSeconds(0);
    this._startDate = new Date(ev.detail.date);
    ev.detail.date.setHours(23);
    ev.detail.date.setMinutes(59);
    ev.detail.date.setSeconds(59);
    this._endDate = new Date(ev.detail.date);
  }

  entityChanged(ev) {
    this._entityIds = [...ev.detail.date];
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    /*Convert data from object to Map*/
    this.panel.config.entities = new Map(Object.entries(this.panel.config.entities));
    this._entityIds = Array.from(this.panel.config.entities.keys());
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
            .date=${this._startDate}
            ?disabled=${this._isLoading}
            ?narrow = ${this.narrow}
            @change=${this.dateRangeChanged}
          ></ha-route-day-picker>
          <entity-multiselect-picker
            .hass=${this.hass}
            .entityIds=${this.panel.config.entities}
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

customElements.define("ha-panel-route", RoutePanel);
