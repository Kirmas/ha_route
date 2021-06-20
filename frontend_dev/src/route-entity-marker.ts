import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { fireEvent } from "../homeassistant-frontend/src/common/dom/fire_event";
import { HomeAssistant } from "../homeassistant-frontend/src/types";

class RouteEntityMarker extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: "entity-id" }) public entityId?: string;

  @property({ attribute: "entity-name" }) public entityName?: string;

  @property({ attribute: "entity-picture" }) public entityPicture?: string;

  @property({ attribute: "entity-color" }) public entityColor?: string;

  protected render() {
    return html`
      <div
        class="marker"
        style="border-color: ${this.entityColor }"
      >
        ${this.entityPicture
          ? html`<div
              class="entity-picture"
              style="background-image: url(${this.entityPicture})"
            ></div>`
          : this.entityName}
      </div>
    `;
  }

  static get styles() {
    return css`
      .marker {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        width: 48px;
        height: 48px;
        font-size: var(--ha-marker-font-size, 1.5em);
        border-radius: 50%;
        border: 1px solid var(--ha-marker-color, var(--primary-color));
        color: var(--primary-text-color);
        background-color: var(--card-background-color);
      }
      .entity-picture {
        background-size: cover;
        height: 100%;
        width: 100%;
      }
    `;
  }
}

customElements.define("route-entity-marker", RouteEntityMarker);
