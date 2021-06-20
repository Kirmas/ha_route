#!/usr/local/bin/python3
# coding: utf-8

import logging
from . import DOMAIN
from homeassistant.helpers.entity import Entity
from .const import (ATTR_ROUTE_ENTITY_PICTURE, ATTR_ROUTE_REAL_NAME, ATTR_ROUTE_LATITUDE, ATTR_ROUTE_LONGITUDE)

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(hass, entry, async_add_devices):
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
            "identifiers": {(DOMAIN, "01932d66-6d6e-11eb-9439-0242ac130002")},
            "name": "route",
            "manufacturer": "@Kirmas",
            "model": "",
            "sw_version": "1.0.0",
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
        attrs[ATTR_ROUTE_LATITUDE] = self._sensors_gps.states[self._entity][1]
        attrs[ATTR_ROUTE_LONGITUDE] = self._sensors_gps.states[self._entity][2]
        attrs[ATTR_ROUTE_REAL_NAME] = self._sensors_gps.states[self._entity][3]
        attrs[ATTR_ROUTE_ENTITY_PICTURE] = self._sensors_gps.states[self._entity][4]
        return attrs
