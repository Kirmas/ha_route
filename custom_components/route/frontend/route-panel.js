import "https://unpkg.com/wired-card@2.1.0/lib/wired-card.js?module";
import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

import "./day-picker.js";

var isDebug = true; 

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
      _startDate: { type: Date },
      _endDate: { type: Date },
      _entityId: { type: String },
      _ranges: { type: Object },
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
    this._entityId = "sensor.virtual_person_igor_pakhomov,sensor.virtual_person_iuliia_pakhomova";
  }

  routeData = new Map();

  async UpdateGPSHistory() {
    this._isLoading = true;

    const stateHistory = await this.hass.callApi(
      "GET",
      `history/period/${this._startDate.toISOString()}?end_time=${this._endDate.toISOString()}&filter_entity_id=${this._entityId}`
    );

    this.routeData = new Map();

    if (!stateHistory) {
      return;
    }

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

      this.routeData.set(stateInfo[0].entity_id, routes);
    });

    if(isDebug){
      console.log("UpdateGPSHistory:", this.routeData);
    }
    this._isLoading = false;
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

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setDate(todayEnd.getDate() + 1);
    todayEnd.setMilliseconds(todayEnd.getMilliseconds() - 1);

    const todayCopy = new Date(today);

    const yesterday = new Date(todayCopy.setDate(today.getDate() - 1));
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setDate(yesterdayEnd.getDate() + 1);
    yesterdayEnd.setMilliseconds(yesterdayEnd.getMilliseconds() - 1);

    const thisWeekStart = new Date(
      todayCopy.setDate(today.getDate() - today.getDay())
    );
    const thisWeekEnd = new Date(
      todayCopy.setDate(thisWeekStart.getDate() + 7)
    );
    thisWeekEnd.setMilliseconds(thisWeekEnd.getMilliseconds() - 1);

    const lastWeekStart = new Date(
      todayCopy.setDate(today.getDate() - today.getDay() - 7)
    );
    const lastWeekEnd = new Date(
      todayCopy.setDate(lastWeekStart.getDate() + 7)
    );
    lastWeekEnd.setMilliseconds(lastWeekEnd.getMilliseconds() - 1);

    this._ranges = {
      [this.hass.localize("ui.panel.history.ranges.today")]: [today, todayEnd],
      [this.hass.localize("ui.panel.history.ranges.yesterday")]: [
        yesterday,
        yesterdayEnd,
      ],
      [this.hass.localize("ui.panel.history.ranges.this_week")]: [
        thisWeekStart,
        thisWeekEnd,
      ],
      [this.hass.localize("ui.panel.history.ranges.last_week")]: [
        lastWeekStart,
        lastWeekEnd,
      ],
    };
  }

  updated(changedProps) {
    //console.log("updated", changedProps, this._ranges);
    if (
      changedProps.has("_startDate") ||
      changedProps.has("_endDate") ||
      changedProps.has("_entityId")
    ) {
      this.UpdateGPSHistory();
    }
  }

  render() {
    return html`
    <ha-app-layout>
    <app-header slot="header" fixed>
      <app-toolbar>
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div main-title>Route</div> <!--Localize this-->
      </app-toolbar>
    </app-header>
    <div class="flex content">
      <div class="flex layout horizontal wrap">
        <ha-route-day-picker
          .hass=${this.hass}
          ?disabled=${this._isLoading}
          .date=${this._startDate}
          .ranges=${this._ranges}
          @change=${this.dateRangeChanged}
        ></ha-route-day-picker>
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

  static get styles() {
    return [
      css`
        :host {
          font-family: var(--paper-font-body1_-_font-family);
          -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
          font-size: var(--paper-font-body1_-_font-size);
          font-weight: var(--paper-font-body1_-_font-weight);
          line-height: var(--paper-font-body1_-_line-height);
        }
        app-header-layout,
        ha-app-layout {
          background-color: var(--primary-background-color);
        }
        app-header,
        app-toolbar {
          background-color: var(--app-header-background-color);
          font-weight: 400;
          color: var(--app-header-text-color, white);
        }
        app-toolbar {
          height: var(--header-height);
        }
        app-header div[sticky] {
          height: 48px;
        }
        app-toolbar [main-title] {
          margin-left: 20px;
        }
        h1 {
          font-family: var(--paper-font-headline_-_font-family);
          -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
          white-space: var(--paper-font-headline_-_white-space);
          overflow: var(--paper-font-headline_-_overflow);
          text-overflow: var(--paper-font-headline_-_text-overflow);
          font-size: var(--paper-font-headline_-_font-size);
          font-weight: var(--paper-font-headline_-_font-weight);
          line-height: var(--paper-font-headline_-_line-height);
        }
        h2 {
          font-family: var(--paper-font-title_-_font-family);
          -webkit-font-smoothing: var(--paper-font-title_-_-webkit-font-smoothing);
          white-space: var(--paper-font-title_-_white-space);
          overflow: var(--paper-font-title_-_overflow);
          text-overflow: var(--paper-font-title_-_text-overflow);
          font-size: var(--paper-font-title_-_font-size);
          font-weight: var(--paper-font-title_-_font-weight);
          line-height: var(--paper-font-title_-_line-height);
        }
        h3 {
          font-family: var(--paper-font-subhead_-_font-family);
          -webkit-font-smoothing: var(--paper-font-subhead_-_-webkit-font-smoothing);
          white-space: var(--paper-font-subhead_-_white-space);
          overflow: var(--paper-font-subhead_-_overflow);
          text-overflow: var(--paper-font-subhead_-_text-overflow);
          font-size: var(--paper-font-subhead_-_font-size);
          font-weight: var(--paper-font-subhead_-_font-weight);
          line-height: var(--paper-font-subhead_-_line-height);
        }
        a {
          color: var(--primary-color);
        }
        .secondary {
          color: var(--secondary-text-color);
        }
        .error {
          color: var(--error-color);
        }
        .warning {
          color: var(--error-color);
        }
        mwc-button.warning {
          --mdc-theme-primary: var(--error-color);
        }
        button.link {
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          text-align: left;
          text-decoration: underline;
          cursor: pointer;
        }
        .card-actions a {
          text-decoration: none;
        }
        .card-actions .warning {
          --mdc-theme-primary: var(--error-color);
        }
        .layout.horizontal,
        .layout.vertical {
          display: flex;
        }
        .layout.inline {
          display: inline-flex;
        }
        .layout.horizontal {
          flex-direction: row;
        }
        .layout.vertical {
          flex-direction: column;
        }
        .layout.wrap {
          flex-wrap: wrap;
        }
        .layout.no-wrap {
          flex-wrap: nowrap;
        }
        .layout.center,
        .layout.center-center {
          align-items: center;
        }
        .layout.bottom {
          align-items: flex-end;
        }
        .layout.center-justified,
        .layout.center-center {
          justify-content: center;
        }
        .flex {
          flex: 1;
          flex-basis: 0.000000001px;
        }
        .flex-auto {
          flex: 1 1 auto;
        }
        .flex-none {
          flex: none;
        }
        .layout.justified {
          justify-content: space-between;
        }
        
        .content {
          padding: 0 16px 16px;
        }
        .progress-wrapper {
          height: calc(100vh - 136px);
        }
        :host([narrow]) .progress-wrapper {
          height: calc(100vh - 198px);
        }
        .progress-wrapper {
          position: relative;
        }
        ha-date-range-picker {
          margin-right: 16px;
          max-width: 100%;
        }
        :host([narrow]) ha-date-range-picker {
          margin-right: 0;
        }
        ha-circular-progress {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        ha-entity-picker {
          display: inline-block;
          flex-grow: 1;
          max-width: 400px;
        }
        :host([narrow]) ha-entity-picker {
          max-width: none;
          width: 100%;
        }
      `,
    ];
  }
}

customElements.define("ha-panel-route", RoutePanel);