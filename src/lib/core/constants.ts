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
