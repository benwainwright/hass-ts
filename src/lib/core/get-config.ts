import { HassConfig } from "@types";
import {
  HASS_HOST_ENV,
  HASS_HTTP_PATH_ENV,
  HASS_PORT_ENV,
  HASS_TOKEN_ENV,
  HASS_WS_PATH_ENV,
  SUPERVISOR_TOKEN_ENV,
} from "./constants.js";

import { getEnv } from "@utils";
import dotEnv from "dotenv";

/**
 * @public
 *
 * Parse Home Assistant config from environment variables
 *
 * HASS_TOKEN - access token
 * HASS_WS_PATH - url path portion for the websocket API
 * HASS_HTTP_PATH - url path portion for the HTTP API
 * HASS_HOST - home assistant host
 * HASS_PORT - home assistant port
 *
 * Note - will supply the correct default values for the http and
 * websocket path segment. When executed in the context of an addon,
 * no environment variables need to be supplied
 */
export const getConfig = (): HassConfig => {
  dotEnv.config();
  const supervisorToken = process.env[SUPERVISOR_TOKEN_ENV];

  const websocketPath = supervisorToken
    ? `/core/websocket`
    : process.env[HASS_WS_PATH_ENV] ?? `/api/websocket`;

  const httpPath = supervisorToken
    ? `/core/api`
    : process.env[HASS_HTTP_PATH_ENV] ?? `/api`;

  const host = supervisorToken ? `supervisor` : getEnv(HASS_HOST_ENV);
  const port = supervisorToken ? 80 : process.env[HASS_PORT_ENV] ?? 8123;
  const token = supervisorToken ?? getEnv(HASS_TOKEN_ENV);

  if (!port) {
    throw new Error("Please supply a port!");
  }

  return {
    host,
    port: Number(port),
    token,
    websocketPath,
    httpPath,
  };
};
