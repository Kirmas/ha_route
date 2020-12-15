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
  static get properties() {
    return {
      hass: { type: Object },
      date: { type: Date },
      endDate: { type: Date }
    };
  }

  get _daypickerdialog() {
    return this.shadowRoot.querySelector('.route-day-picker-dialog');
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
      <mwc-dialog class="route-day-picker-dialog">
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
      </mwc-dialog>
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
    if (!this._daypickerdialog.open) {
      this._daypickerdialog.open = true;
    }
  }

  _cancelDateRange() {
    if (this._daypickerdialog.open) {
      this._daypickerdialog.open = false;
    }
  }

  _applyDateRange() {
    if (this._daypickerdialog.open) {
      this.date = new Date(this._daypicker.value);
      this._daypickerdialog.open = false;
      let event = new CustomEvent('change', {
        detail: {
          date: this.date
        }
      });
      this.dispatchEvent(event);
    }
  }
}

customElements.define("ha-route-day-picker",  DayPickerElement);
