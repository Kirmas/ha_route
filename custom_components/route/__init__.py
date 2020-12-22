"""The route component."""
from datetime import datetime
from datetime import timedelta
import logging
import voluptuous as vol
import json
import aiohttp
from homeassistant.const import CONF_DEVICES
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.typing import ConfigType, HomeAssistantType
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.discovery import async_load_platform
from homeassistant.helpers.dispatcher import async_dispatcher_send

_LOGGER = logging.getLogger(__name__)
DOMAIN = "route"
SUPPORTED_DOMAINS = ["sensor"]
CONF_MIN_DST = 'mindst'
DEFAULT_MIN_DST = 100

CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema(
                {vol.Optional(CONF_MIN_DST, default=DEFAULT_MIN_DST): cv.positive_float,
                vol.Required(CONF_DEVICES): vol.All(cv.ensure_list,),
                })}, extra=vol.ALLOW_EXTRA,)

async def async_setup(hass: HomeAssistantType, config: ConfigType) -> bool:
    hass.data[DOMAIN] = {}
    myconfig = {
        "mindst": config[DOMAIN][CONF_MIN_DST],
        "devs": config[DOMAIN][CONF_DEVICES],
    }

    sensors_gps = hass.data[DOMAIN]["sensors_gps"] = SensorsGps(hass,myconfig)
    await sensors_gps.getDeviceTrackers()
    async_track_time_interval(hass, sensors_gps.async_update, timedelta(seconds=60))

    for platform in SUPPORTED_DOMAINS:
        hass.async_create_task(async_load_platform(hass, platform, DOMAIN, {}, config))

    entities = {}
    for device in myconfig["devs"]:
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
            "module_url": url + "/route-panel.js",
        }

        config = {}
        config["mindst"] = myconfig["mindst"]
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
    def __init__(self, hass, mycfg):
        self.hass = hass
        self.states = {}
        self._cfg = mycfg
        self._devs = self._cfg["devs"]

    async def async_update(self, now, **kwargs) -> None:
        try:
            await self.getDeviceTrackers()
        except:
            _LOGGER.warning("Update failed")
            return
        async_dispatcher_send(self.hass, DOMAIN)

    async def getDeviceTrackers(self):
        timenow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

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
