export interface AuthRequiredMessageResponse {
  type: "auth";
  access_token: string;
}

export interface AuthRequiredMessage {
  type: "auth_required";
  ha_version: string;
}

export interface AuthOkMessage {
  type: "auth_ok";
  ha_version: string;
}

export interface AuthInvalidMessage {
  type: "auth_invalid";
  message: string;
}
