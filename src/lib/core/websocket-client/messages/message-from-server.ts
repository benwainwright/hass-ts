import { AuthInvalidMessage, AuthOkMessage, AuthRequiredMessage } from "./auth";
import { ErrorResult } from "./error-result";
import { Result } from "./result";

export type MessageFromServer<T = unknown> =
  | AuthRequiredMessage
  | AuthOkMessage
  | AuthInvalidMessage
  | Result<T>
  | ErrorResult;
