import { HassClientConfig } from "@types";
import { Client, IClient } from "./client/index.js";
import { WebsocketClient } from "./websocket-client/index.js";
import { getLogger } from "./get-logger.js";
import { RestClient } from "./rest-client/index.js";

/**
 * @param config - Config for the Home Assistant client
 * @alpha
 */
export const initialiseClient = async ({
  host,
  port,
  token,
  logger,
}: HassClientConfig): Promise<IClient> => {
  const finalLogger = getLogger(logger);

  const websocketClient = new WebsocketClient(host, port, token, finalLogger);
  await websocketClient.init();
  const restClient = new RestClient(host, port, token, finalLogger);
  const client = new Client(websocketClient, restClient);

  return client;
};
