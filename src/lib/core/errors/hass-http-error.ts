import { HassTsError } from "./hass-ts-error";

export class HassHttpError extends HassTsError {
  constructor(
    public readonly code: number,
    message: string,
  ) {
    super(message);
  }
}
