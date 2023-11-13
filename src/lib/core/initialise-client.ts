import { HassClientConfig } from "@types";

import { Client, IClient } from "./client";
import { WebsocketClient } from "./websocket-client";

export const initialiseClient = async ({
  host,
  port,
  token,
}: HassClientConfig): Promise<IClient> => {
  const websocketClient = new WebsocketClient(host, port, token);
  await websocketClient.init();
  const client = new Client(websocketClient);

  return client;
};
