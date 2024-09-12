import { HassConfig } from "@types";
import { Client, IClient } from "./client/index.js";
import { WebsocketClient } from "./websocket-client/index.js";
import { getLogger } from "./get-logger.js";
import { RestClient } from "./rest-client/index.js";

/**
 * Initialise the http and websocket connections and return a client that is ready
 * to use. Use with {@link getConfig} to get the correct config values
 *
 * @param config - Config for the Home Assistant client
 * @alpha
 *
 * @example
 *
 * const config = getConfig()
 * const client = await initialiseClient(config)
 *
 */
export const initialiseClient = async ({
  host,
  port,
  httpPath,
  websocketPath,
  token,
  logger,
}: HassConfig): Promise<IClient> => {
  const finalLogger = getLogger(logger);
  const websocketClient = new WebsocketClient(
    host,
    port,
    websocketPath,
    token,
    finalLogger,
  );

  await websocketClient.init();
  const restClient = new RestClient(host, port, httpPath, token, finalLogger);
  const client = new Client(websocketClient, restClient);

  return client;
};
