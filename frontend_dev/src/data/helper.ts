import {HassEntity} from "home-assistant-js-websocket";
import {HomeAssistant} from "../../homeassistant-frontend/src/types";

export class RouteInfo {
  time: Date;
  latitude: number;
  longitude: number;
  street: string;
  
  constructor(time:Date, latitude, longitude, street){
    this.time = time;
    this.latitude = latitude;
    this.longitude = longitude;
    this.street = street;
  }
}

export const fetchRouteDate = (
  hass: HomeAssistant,
  day: Date,
  entityIds
): Promise<HassEntity[][]> => {

  let startTime = new Date(day);
  startTime.setHours(0, 0, 0, 0);

  let endTime = new Date(day);
  endTime.setHours(23, 59, 59);

  return hass.callApi(
    "GET",
    `history/period/${startTime.toISOString()}?end_time=${endTime.toISOString()}&filter_entity_id=${entityIds.join()}`
  );
};