export const HTTP = {
  statusCodes: {
    unauthorized: 401,
    ok: 200,
    notModified: 304,
    badRequest: 400,
  },
} as const;

export const ERRORS = {
  hostCannotBeAnEmptyString: "Host cannot be an empty string",
  callbackNotRegistered: "Callback was not previously registered",
  tokenCannotBeAnEmptyString: "Token cannot be an empty string",
  portCannotBeNegative: "Port cannot be negative",
  notInitialised: "The websocket client has not been initialised",
  authenticationFailed: "Authentication failed",
  argumentsAreInvalid: "Arguments are invalid",
};

export const HASS_URL_ENV_VAR = "HASS_URL";
export const HASS_TOKEN_ENV_VAR = "HASS_TOKEN";
export const HASS_TOKEN_ENV = "HASS_TOKEN";
export const HASS_HOST_ENV = "HASS_HOST";
export const SUPERVISOR_TOKEN_ENV = "SUPERVISOR_TOKEN";
export const HASS_PORT_ENV = "HASS_PORT";
export const HASS_WS_PATH_ENV = "HASS_WS_PATH";
export const HASS_HTTP_PATH_ENV = "HASS_HTTP_PATH";
