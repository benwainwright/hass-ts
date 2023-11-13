import { HassClientConfig } from "@types";

import { Client, IClient } from "./client";
import { WebsocketClient } from "./websocket-client";
import { getLogger } from "./get-logger";

export const initialiseClient = async ({
  host,
  port,
  token,
  logger,
}: HassClientConfig): Promise<IClient> => {
  const finalLogger = getLogger(logger);

  const websocketClient = new WebsocketClient(host, port, token, finalLogger);
  await websocketClient.init();
  const client = new Client(websocketClient);

  return client;
};
