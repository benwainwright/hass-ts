import {
  AuthInvalidMessage,
  AuthOkMessage,
  AuthRequiredMessage,
} from "./auth.js";
import { ErrorResult } from "./error-result.js";
import { EventMessage } from "./event-message.js";
import { Result } from "./result.js";
import { TestArbitraryMessage } from "./test-arbitrary-message.js";
import { TriggerEventMessage } from "./trigger-event-message.js";

export type MessageFromServer<T = unknown> =
  | AuthRequiredMessage
  | AuthOkMessage
  | AuthInvalidMessage
  | Result<T>
  | ErrorResult
  | EventMessage
  | TriggerEventMessage<T>
  | TestArbitraryMessage;
