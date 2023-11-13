import { MessageFromServer } from "../websocket-client";

export interface IClient {
  subscribeToEvents(
    callback: (message: MessageFromServer) => void,
  ): Promise<void>;

  subscribeToEvents(
    type: string,
    callback: (message: MessageFromServer) => void,
  ): Promise<void>;
}
