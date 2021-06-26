import logging
import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
import homeassistant.helpers.config_validation as cv
from .const import (DOMAIN, CONF_MIN_DST, CONF_MIN_TIME, CONF_PERSON)

_LOGGER = logging.getLogger(__name__)
DEFAULT_MIN_DST = 250
DEFAULT_MIN_TIME = 8 #in minute


CONFIG_SCHEMA = vol.Schema({
                vol.Required(CONF_MIN_DST, default=DEFAULT_MIN_DST): cv.positive_float,
                vol.Required(CONF_MIN_TIME, default=DEFAULT_MIN_TIME): cv.positive_int,
                })

class RouteConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):

    async def async_step_user(self, user_input):
        """Handle a flow initialized by the user."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            _LOGGER.warning(user_input)
            return self.async_create_entry(
                title="",
                data={
                    CONF_MIN_DST: user_input[CONF_MIN_DST],
                    CONF_MIN_TIME: user_input[CONF_MIN_TIME],
                    CONF_PERSON: user_input[CONF_PERSON],
                },
            )
        
        dev_list = []
        for key, value in self.hass.data["entity_info"].items(): 
            if value["domain"] == "person":
                attributes = self.hass.states.get(key).attributes
                if "latitude" in attributes:
                    dev_list.append(key)

        return self.async_show_form(
            step_id="user", data_schema=CONFIG_SCHEMA.extend(
                {vol.Required(CONF_PERSON): cv.multi_select(dev_list)}
            )
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Get the options flow for this handler."""
        return OptionsFlowHandler()
    
class OptionsFlowHandler(config_entries.OptionsFlow):
    """Handle a option flow for route."""

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(
                title="",
                data={
                    CONF_MIN_DST: user_input[CONF_MIN_DST],
                    CONF_MIN_TIME: user_input[CONF_MIN_TIME],
                    CONF_PERSON: user_input[CONF_PERSON],
                },
            )

        dev_list = []
        for key, value in self.hass.data["entity_info"].items(): 
            if value["domain"] == "person":
                attributes = self.hass.states.get(key).attributes
                if "latitude" in attributes:
                    dev_list.append(key)

        return self.async_show_form(
            step_id="init", data_schema=CONFIG_SCHEMA.extend(
                {vol.Required(CONF_PERSON): cv.multi_select(dev_list)}
            )
        )
