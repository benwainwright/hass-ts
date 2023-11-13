import { AuthInvalidMessage, AuthOkMessage, AuthRequiredMessage } from "./auth";
import { ErrorResult } from "./error-result";
import { EventMessage } from "./event-message";
import { Result } from "./result";
import { TestArbitraryMessage } from "./test-arbitrary-message";

export type MessageFromServer<T = unknown> =
  | AuthRequiredMessage
  | AuthOkMessage
  | AuthInvalidMessage
  | Result<T>
  | ErrorResult
  | EventMessage
  | TestArbitraryMessage;
