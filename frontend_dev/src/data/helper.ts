import {HassEntity} from "home-assistant-js-websocket";
import {HomeAssistant} from "../../homeassistant-frontend/src/types";

export class RouteInfo {
  time: Date;
  latitude: number;
  longitude: number;
  street: string;
  timeDelta: number;
  gps_accuracy: number;
  debug_info: string;

  constructor(time:Date, latitude, longitude, gps_accuracy, debug_info){
    this.time = time;
    this.timeDelta = -1.0;
    this.latitude = latitude;
    this.longitude = longitude;
    this.street = "";//use api in feature;
    this.gps_accuracy = gps_accuracy;
    this.debug_info = debug_info;
  }
}

export const fetchRouteDate = (
  hass: HomeAssistant,
  day: Date,
  entities
): Promise<HassEntity[][]> => {

  let startTime = new Date(day);
  startTime.setHours(0, 0, 0, 0);

  let endTime = new Date(day);
  endTime.setHours(23, 59, 59);

  return hass.callApi(
    "GET",
    `history/period/${startTime.toISOString()}?end_time=${endTime.toISOString()}&filter_entity_id=${entities.map(entity => entity.entity_id).join()}&significant_changes_only=0`
  );
};

export const fetchEntityById = (
  hass: HomeAssistant,
  entityId: string
): Promise<HassEntity> => {

  return hass.callApi(
    "GET",
    `states/${entityId}`
  );
};
