import { vi } from "vitest";
import { initialiseClient } from "./initialise-client";
import { WebsocketClient } from "./websocket-client";
import { when } from "jest-when";
import { mock } from "vitest-mock-extended";
import { Client } from "./client";

vi.mock("./client");
vi.mock("./websocket-client");

describe("initialiseClient", () => {
  it("correctly initialises the websocket client, wires it into the client and returns the client", async () => {
    const host = "host";
    const port = 1234;
    const token = "token";

    const mockWebsocketClient = mock<WebsocketClient>();

    when(vi.mocked(WebsocketClient))
      .calledWith(host, port, token, expect.anything())
      .mockReturnValue(mockWebsocketClient);

    const mockClient = mock<Client>();

    when(vi.mocked(Client))
      .calledWith(mockWebsocketClient)
      .mockReturnValue(mockClient);

    const client = await initialiseClient({ host, port, token });

    expect(mockWebsocketClient.init).toHaveBeenCalled();
    expect(client).toBe(mockClient);
  });
});
