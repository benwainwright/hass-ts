import { HassTsError } from "./hass-ts-error.js";

export class HassHttpError extends HassTsError {
  constructor(
    public readonly code: number,
    message: string,
  ) {
    super(message);
  }
}
