#!/usr/local/bin/python3
# coding: utf-8

import logging
from . import DOMAIN
from homeassistant.helpers.entity import Entity
from homeassistant.const import (ATTR_LATITUDE, ATTR_LONGITUDE)

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(hass, entry, async_add_devices):
    _LOGGER.warning("async_setup_entry")
    sensors_gps = hass.data[DOMAIN]["sensors_gps"]
    for key,value in sensors_gps.states.items():
        async_add_devices([GPSSensor(sensors_gps, key)])

class GPSSensor(Entity):

    def __init__(self, sensors_gps, entity_id):
        self._icon = 'mdi:crosshairs-gps'
        self._sensors_gps = sensors_gps
        self._entity = entity_id
        self._name = 'virtual_'+self._entity.replace('.','_')
        self._state = ''

    @property
    def device_info(self):
        """Return device information about route."""
        return {
            "identifiers": {(DOMAIN)},
            "name": "route",
            "manufacturer": "@Kirmas",
            "model": "",
            "sw_version": "0.2.0",
            "entry_type": "service",
        }

    @property
    def unique_id(self):
        """Return a unique ID."""
        return self._entity

    #for HASS
    @property
    def name(self):
        return self._name

    @property
    def state(self):
        return self._sensors_gps.states[self._entity][0]

    @property
    def icon(self):
        return self._icon

    @property
    def device_state_attributes(self):
        attrs = {}
        attrs[ATTR_LATITUDE] = self._sensors_gps.states[self._entity][1]
        attrs[ATTR_LONGITUDE] = self._sensors_gps.states[self._entity][2]
        return attrs
