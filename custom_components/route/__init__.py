"""The route component."""
import logging
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.typing import ConfigType, HomeAssistantType
from .const import (DOMAIN, CONF_MIN_DST, CONF_MIN_TIME, CONF_PERSON)

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistantType, config: ConfigType) -> bool:
    hass.data[DOMAIN] = {}
    return True

async def async_setup_entry(hass: HomeAssistantType, entry: ConfigEntry):
    """Setup up a config entry."""

    entities = []
    for device in entry.data[CONF_PERSON]:
        fullname = device
        entities.append(fullname)
        
    try:
        url = "/api/panel_custom/route"
        location = hass.config.path("custom_components/route/frontend")
        hass.http.register_static_path(url, location)

        custom_panel_config = {
            "name": "ha-panel-route",
            "embed_iframe": False,
            "trust_external": False,
            "js_url": url + "/entrypoint.js",
        }

        config = {}
        config[CONF_MIN_DST] = entry.data[CONF_MIN_DST]
        config[CONF_MIN_TIME] = entry.data[CONF_MIN_TIME]
        config["entities"] = entities
        config["_panel_custom"] = custom_panel_config

        hass.components.frontend.async_register_built_in_panel(
            component_name="custom",
            sidebar_title="Routes",
            sidebar_icon="mdi:routes",
            frontend_url_path="routes",
            config=config,
            require_admin=False,
        )
    except:
        _LOGGER.error("Error creating panel")
        return False

    return True
