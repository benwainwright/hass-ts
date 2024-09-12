import { vi } from "vitest";
import { when } from "jest-when";

import { Logger } from "@types";

import { initialiseClient } from "./initialise-client.js";
import { WebsocketClient } from "./websocket-client/index.js";
import { mock } from "vitest-mock-extended";
import { Client } from "./client/index.js";
import { getLogger } from "./get-logger.js";
import { RestClient } from "./rest-client/index.js";

vi.mock("./client/index.js");
vi.mock("./websocket-client/index.js");
vi.mock("./rest-client/index.js");
vi.mock("./get-logger.js");

describe("initialiseClient", () => {
  it("correctly initialises the websocket client, wires it into the client and returns the client", async () => {
    const host = "host";
    const port = 1234;
    const token = "token";
    const websocketPath = "/api/websocket";
    const httpPath = "/api";

    const mockWebsocketClient = mock<WebsocketClient>();
    const mockRestClient = mock<RestClient>();

    const logger = mock<Logger>();

    when(getLogger).calledWith(logger).mockReturnValue(logger);

    when(vi.mocked(WebsocketClient))
      .calledWith(host, port, websocketPath, token, logger)
      .mockReturnValue(mockWebsocketClient);

    when(vi.mocked(RestClient))
      .calledWith(host, port, httpPath, token, logger)
      .mockReturnValue(mockRestClient);

    const mockClient = mock<Client>();

    when(vi.mocked(Client))
      .calledWith(mockWebsocketClient, mockRestClient)
      .mockReturnValue(mockClient);

    const client = await initialiseClient({
      host,
      port,
      httpPath,
      websocketPath,
      token,
      logger,
    });

    expect(mockWebsocketClient.init).toHaveBeenCalled();
    expect(client).toBe(mockClient);
  });
});
