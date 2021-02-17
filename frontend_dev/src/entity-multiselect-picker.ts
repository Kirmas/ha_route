import {
  LitElement,
  html,
  css,
} from "lit-element";

import {
  mdiClose,
  mdiMenuUp,
  mdiMenuDown,
  mdiCheck,
} from "@mdi/js";

export class EntityMultiselectPickerElement extends LitElement {
  constructor() {
    super();
    this.open = false;
    this.searchValue = "";
  }

  static get properties() {
    return {
      hass: { type: Object },
      entityIds: { type: Map },
      selectedEntityIds: { type: Array },
      searchValue: { type: String },
      open: { type: Boolean },
    };
  }

  renderEntityId(entityId)
  {
    const selected = this.selectedEntityIds.includes(entityId[0]);
    return html`
      <div @click=${this._handleEntityClick} class="multiselect-list-element-container">
        <div class="multiselect-list-element-check">
          ${selected ?
            html`<ha-svg-icon
            .path=${mdiCheck}
          ></ha-svg-icon>` : html``}
        </div>
        <div class="multiselect-list-element">
          <div>${entityId[1]}</div>
          <div class="secondary">${entityId[0]}</div>
        </div>
      </div>`
    ;
  }

  get _inputElement() {
    return this.shadowRoot.querySelector('.paper-input-input');
  }

  get _filteredentityIds(){
    if(this.searchValue){
      return [...this.entityIds].filter(
        ([key, value]) => key.includes(this.searchValue) || value.includes(this.searchValue)
      );
    }
    else{
      return [...this.entityIds];
    }
  }

  render(){
    return html`
      <div class="multiselect" role="combobox" aria-expanded="true">
        <paper-input-container 
          @click=${this._openMultiselectPopup}
          .alwaysFloatLabel = ${this.selectedEntityIds.length > 0 || this.searchValue}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
        >
          <div class="suffix" slot="suffix">
            ${this.selectedEntityIds.length > 0 || this.searchValue
              ? html`
                <mwc-icon-button
                  .label=${this.hass.localize(
                    "ui.components.entity.entity-picker.clear"
                  )}
                  tabindex="-1"
                  @click=${this._clearValues}
                  no-ripple
                >
                  <ha-svg-icon .path=${mdiClose}></ha-svg-icon>
                </mwc-icon-button>
              `
            : ""}
            <mwc-icon-button
              .label=${this.hass.localize(
                "ui.components.entity.entity-picker.show_entities"
              )}
              class="toggle-button"
              tabindex="-1"
            >
              <ha-svg-icon
                .path=${this.open ? mdiMenuUp : mdiMenuDown}
              ></ha-svg-icon>
            </mwc-icon-button>
          </div>
          <label slot="label">${this.label === undefined
            ? this.hass.localize("ui.components.entity.entity-picker.entity")
            : this.label}</label>
          <div bind-value="" slot="input" class="multiselect-input-element" id="input-1">
            ${this.selectedEntityIds.length > 0 ? 
              this.selectedEntityIds.map(entityId => 
                html`
                  <div class="multiselect-tag">
                    <div class="multiselect-tag-text">${this.entityIds.get(entityId)}</div>
                    <mwc-icon-button
                      .label=${this.hass.localize(
                        "ui.components.entity.entity-picker.clear"
                      )}
                      class="multiselect-tag-remove-button"
                      tabindex="-1"
                      @click=${this._clearValue}
                      no-ripple
                    >
                      <ha-svg-icon .path=${mdiClose}></ha-svg-icon>
                    </mwc-icon-button>
                  </div>
                `) : ``
            }
            <input 
              @input=${this._searchValueChanged} 
              value="${this.searchValue}" 
              class="paper-input-input" 
              autocomplete="off" 
              placeholder="" 
              autocapitalize="none" 
              autocorrect="off" 
              aria-describedby="" 
              aria-labelledby="paper-input-label-2"
            >
          </div>
        </paper-input-container>
        <div @click=${this._closeMultiselectPopup} class="multiselect-scrim ${this.open ? `multiselect-opened` : ``}"></div>
        <div class="multiselect-popup ${this.open ? `multiselect-opened` : ``}">
          <div class="multiselect-list">
            ${this._filteredentityIds.map(entityId => this.renderEntityId(entityId))}
          </div>
        </div>
      </div>
    `;
  }

  static get styles(){
    return css`
      :host {
        display: inline-block;
        flex-grow: 1;
        max-width: 800px;
      }

      :host([narrow]) {
        max-width: none;
        width: 100%;
      }

      .multiselect {
        width: 100%;
      }

      .multiselect-tag {
        cursor: pointer;
        display: flex; 
        padding: 3px;
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color); 
        border-radius: 15px; 
        margin: 0px 2px 2px 0px; 
        line-height: 1;
      }

      .multiselect-input-element{
        display: flex;
      }

      .multiselect-input-element .paper-input-input {
        padding: var(--paper-input-container-shared-input-style_-_padding); 
        width: var(--paper-input-container-shared-input-style_-_width); 
        max-width: var(--paper-input-container-shared-input-style_-_max-width); 
        background: var(--paper-input-container-shared-input-style_-_background); 
        border: var(--paper-input-container-shared-input-style_-_border); 
        font-family: var(--paper-input-container-shared-input-style_-_font-family); 
        font-size: var(--paper-input-container-shared-input-style_-_font-size); 
        line-height: var(--paper-input-container-shared-input-style_-_line-height);
        outline: var(--paper-input-container-shared-input-style_-_outline); 
      }
      
      .multiselect-tag-text {
        padding: 0px 0px 0px 5px;
        white-space: nowrap; 
        color: var(--text-primary-color);
      }

      .multiselect-tag-remove-button {
        --mdc-icon-button-size: 14px;
        --mdc-icon-size: 14px; 
        color: var(--text-primary-color);
      }

      .suffix {
        display: flex;
      }
      
      mwc-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 0px 2px;
        color: var(--secondary-text-color);
      }

      .multiselect-scrim {
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
      
      .multiselect-popup {
        background-color: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 4px);
        position: absolute;
        z-index: 3001;
        display: none;
      }
      
      .multiselect-opened {
        display: block;
      }

      .multiselect-list-element-container{
        cursor: pointer;
        padding: 4px 10px;
        display: flex;
        align-items: center;
      }
      
      .multiselect-list-element-check{
        background: var(--secondary-background-color);
        font-size: 24px;
        line-height: 1;
        width: 24px;
        height: 24px;
        margin-right: 10px;
        color: var(--material-secondary-text-color);
      }
      
      .multiselect-list-element{
        color: var(--material-body-text-color);
        font-size: var(--paper-font-subhead_-_font-size);
        line-height: 24px;
        padding: 9px 0px;
      }

      .multiselect-list-element .secondary{
        font-size: var(--paper-font-body1_-_font-size);
        line-height: 20px;
        color: var(--secondary-text-color);
      }
    `;
  }

  _clearValues(){
    this._setSearchValue("");
    this.selectedEntityIds = [];
    this.selectedEntityIdsChanged();
  }

  _clearValue(el){
    const clickedEntityId = el.path[6].innerText;
    const index = this.selectedEntityIds.findIndex(entityId => this.entityIds.get(entityId) === clickedEntityId);

    if(index > -1)
    {
      this.selectedEntityIds.splice(index, 1);
    }
    this.requestUpdate("selectedEntityIds");
    this.selectedEntityIdsChanged();
  }

  _setSearchValue(newValue)
  {
    this.searchValue = newValue;
    this._inputElement.value = this.searchValue;
  }

  _searchValueChanged(){
    this.searchValue = this._inputElement.value;
  }

  _openMultiselectPopup() {
    this.open = true;
  }

  _closeMultiselectPopup() {
    this.open = false;
  }

  _handleEntityClick(el) {
    const clickedEntityId = el.path
      .find(element => element.className == "multiselect-list-element-container")
      .getElementsByClassName("multiselect-list-element")[0]
      .getElementsByClassName("secondary")[0].innerText;
    const index = this.selectedEntityIds.indexOf(clickedEntityId);
    if(index > -1)
    {
      this.selectedEntityIds.splice(index, 1);
    }
    else
    {
      this.selectedEntityIds.push(clickedEntityId);
    }
    this.requestUpdate("selectedEntityIds");
    this.selectedEntityIdsChanged();

    this._setSearchValue("");
  }

  selectedEntityIdsChanged() {
    let event = new CustomEvent('change', {
      detail: {
        date: this.selectedEntityIds
      }
    });
    this.dispatchEvent(event);
  }
}

customElements.define("entity-multiselect-picker",  EntityMultiselectPickerElement);
