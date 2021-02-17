"""The route component."""
from datetime import timedelta
import logging
import voluptuous as vol
import json
import aiohttp
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import CONF_DEVICES
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.typing import ConfigType, HomeAssistantType
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.discovery import async_load_platform
from homeassistant.helpers.dispatcher import async_dispatcher_send
from .const import (DOMAIN, CONF_MIN_DST, CONF_MIN_TIME, CONF_PERSON)

_LOGGER = logging.getLogger(__name__)
SUPPORTED_DOMAINS = ["sensor"]

CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({
                vol.Required(CONF_DEVICES): vol.All(cv.ensure_list,),
                })}, extra=vol.ALLOW_EXTRA,)

async def async_setup(hass: HomeAssistantType, config: ConfigType) -> bool:
    hass.data[DOMAIN] = {}
    return True

async def async_setup_entry(hass: HomeAssistantType, entry: ConfigEntry):
    """Setup up a config entry."""
    sensors_gps = hass.data[DOMAIN]["sensors_gps"] = SensorsGps(hass, entry.data[CONF_PERSON])
    await sensors_gps.getDeviceTrackers()
    async_track_time_interval(hass, sensors_gps.async_update, timedelta(seconds=60))

#    for platform in SUPPORTED_DOMAINS:
#        hass.async_create_task(async_load_platform(hass, platform, DOMAIN, {}, {}))

    hass.async_create_task(
        hass.config_entries.async_forward_entry_setup(
            entry, "sensor"
        )
    )

    entities = {}
    for device in entry.data[CONF_PERSON]:
        device_info = device.split('.')
        friendly_name = device_info[1]
        if hass.states.get(device) != None:
            friendly_name = hass.states.get(device).attributes['friendly_name']
        fullname = device
        if device_info[0] == 'device_tracker' or device_info[0] == "person":
            fullname = 'sensor.virtual_'+device.replace(".", "_")
        entities[fullname] = friendly_name
        
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

class SensorsGps:
    def __init__(self, hass, devs):
        self.hass = hass
        self.states = {}
        self._devs = devs

    async def async_update(self, now, **kwargs) -> None:
        try:
            await self.getDeviceTrackers()
        except:
            _LOGGER.warning("Update failed")
            return
        async_dispatcher_send(self.hass, DOMAIN)

    async def getDeviceTrackers(self):
        for device in self._devs:
            entity_domain = device.split('.')[0]
            if entity_domain == "device_tracker" or entity_domain == "person":
                lat = 0
                lon = 0
                address = ""
                if self.hass.states.get(device) != None:
                    lat = self.hass.states.get(device).attributes['latitude']
                    lon = self.hass.states.get(device).attributes['longitude']
                url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + str(lat) +"&lon="+ str(lon) +"&accept-language=ru&email=ihor666@ya.ru"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url) as response:
                        if response.status == 200:
                            decodedjson = json.loads(await response.text())
                            if "display_name" in decodedjson:
                                address = decodedjson["display_name"]
                self.states[device]=[address,lat,lon]
