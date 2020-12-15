import "https://unpkg.com/app-datepicker@4.4.1/dist/app-datepicker.js?module";

import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

import {
  mdiCalendar
} from "https://unpkg.com/@mdi/js@5.8.55/mdi.js?module";

export class DayPickerElement extends LitElement {
  constructor() {
    super();
    this.open = false;
  }

  static get properties() {
    return {
      hass: { type: Object },
      date: { type: Date },
      endDate: { type: Date },
      open: { type: Boolean },
    };
  }
  
  get _daypicker() {
    return this.shadowRoot.querySelector('.route-day-picker');
  }

  render(){
    return html`
      <div @click=${this._handleInputClick} class="date-range-inputs">
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
        <mwc-button @click=${this._cancelDateRange} slot="secondaryAction">
          ${this.hass.localize("ui.common.cancel")}
        </mwc-button>
        <mwc-button @click=${this._applyDateRange} slot="primaryAction">
          ${this.hass.localize("ui.components.date-range-picker.select")}
        </mwc-button>
      </div>
    `;
  }

  static get styles(){
    return css`
      app-datepicker {
        --app-datepicker-border-top-left-radius: var(--ha-card-border-radius);
        --app-datepicker-border-top-right-radius: var(--ha-card-border-radius);
        --app-datepicker-border-bottom-right-radius: var(--ha-card-border-radius);
        --app-datepicker-border-bottom-left-radius: var(--ha-card-border-radius);
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
      }
      
      .route-day-picker-dialog {
        background-color: var(--card-background-color);
        position: absolute;
        z-index: 3001;
        display: none;
      }
      
      .route-day-picker-opened {
        display: block;
      }

      ha-svg-icon {
        margin-right: 8px;
      }
      .date-range-inputs {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    `;
  }

  _handleInputClick() {
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

customElements.define("ha-route-day-picker",  DayPickerElement);
