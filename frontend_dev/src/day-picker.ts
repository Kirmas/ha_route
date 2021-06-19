import "app-datepicker";

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
  mdiCalendar
} from "@mdi/js";

import {
  HomeAssistant
} from "../homeassistant-frontend/src/types";

@customElement("ha-route-day-picker")
export class DayPickerElement extends LitElement {
  @property({ attribute: false }) public open: Boolean;
  @property({ attribute: false }) public date: Date;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public disabled: Boolean;

  constructor() {
    super();
    this.open = false;
  }
  
  get _daypicker() : any  {
    return this.shadowRoot.querySelector('.route-day-picker');
  }

  render(){
    return html`
      <div @click=${this._openDateRange} class="date-range-inputs">
        <ha-svg-icon .path=${mdiCalendar}></ha-svg-icon>
        <paper-input
          .value=${this.date.toLocaleString(this.hass.language, {
            year: "numeric",
            month: "long",
            day: "numeric"})}
          .label=${this.hass.localize(
            "ui.dialogs.helper_settings.input_datetime.date"
          )}
          .disabled=${this.disabled}
          readonly
        ></paper-input>
      </div>
      <div @click=${this._closeDateRange} class="route-day-picker-scrim${this.open ? ` route-day-picker-opened` : ``}"></div>
      <div class="route-day-picker-dialog${this.open ? ` route-day-picker-opened` : ``}">
        <app-datepicker class="route-day-picker"
          min="2020-01-01"
          max="${new Date().toDateString()}"
          value="${this.date.toDateString()}"
          locale="${this.hass.language}"
          inline
        label="Label" placeholder="Placeholder"></app-datepicker>
        <div class="route-day-picker-footer">
          <mwc-button @click=${this._closeDateRange} slot="secondaryAction">
            ${this.hass.localize("ui.common.cancel")}
          </mwc-button>
          <mwc-button @click=${this._applyDateRange} slot="primaryAction">
            ${this.hass.localize("ui.components.date-range-picker.select")}
          </mwc-button>
        </div>
      </div>
    `;
  }

  static get styles(){
    return css`
      :host {
        margin-right: 16px;
        max-width: 100%;
      }

      :host([narrow]) {
        margin-right: 0px;
      }

      app-datepicker {
        --app-datepicker-border-top-left-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-border-top-right-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-border-bottom-right-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-border-bottom-left-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-accent-color: var(--primary-color);
        --app-datepicker-focused-day-color: var(--text-primary-color);
        --app-datepicker-color: var(--secondary-text-color);
        --app-datepicker-weekday-color: var(--secondary-text-color);
        --app-datepicker-disabled-day-color: var(--disabled-text-color);
        --app-datepicker-bg-color: var(--card-background-color);
      }

      .route-day-picker-scrim {
        display: none;
        position: fixed;
        top: 0px;
        left: 0px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        z-index: 3000;
      }
      
      .route-day-picker-dialog {
        background-color: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 4px);
        position: absolute;
        z-index: 3001;
        display: none;
      }
      
      .route-day-picker-opened {
        display: block;
      }
      
      .route-day-picker-footer {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        border-top: 1px solid var(--divider-color);
      }

      ha-svg-icon {
        margin-right: 8px;
      }

      .date-range-inputs {
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      @media only screen and (max-width: 500px) {
        paper-input {
          min-width: inherit;
        }
        ha-svg-icon {
          display: none;
        }
      }
    `;
  }

  _openDateRange() {
    this.open = true;
  }

  _closeDateRange() {
    this.open = false;
  }

  _applyDateRange() {
      this.date = new Date(this._daypicker.value);

      let event = new CustomEvent('change', {
        detail: {
          date: this.date
        }
      });
      this.dispatchEvent(event);
      this._closeDateRange();
  }
}
