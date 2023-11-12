import { TEST_ERROR_CODE, TEST_ERROR_MESSAGE } from "src/test-support";
import { initialiseMockHassWebsocket } from "../../../test-support/mock-socket";
import { HassTsError } from "../errors/hass-ts-error";
import { WebsocketClient } from "./websocket-client";

const host = "localhost";
const port = 123;
const token = "test-token";
const version = "1.2.3";

describe("The websocket client", () => {
  describe("constructor", () => {
    it("executes without error", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      await client.close();
      server.close();
    });
  });

  describe("sendCommand", () => {
    it("initiates an auth handshake if the client is not authenticated and then returns the correct command response", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      const result = await client.sendCommand({ type: "ping" });
      expect(result).toEqual({ message: "ping" });
      await client.close();
      server.close();
    });

    it("rejects the promise if the response indicates an error", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      await expect(client.sendCommand({ type: "throw" })).rejects.toThrow(
        new HassTsError(TEST_ERROR_CODE, TEST_ERROR_MESSAGE),
      );
      await client.close();
      server.close();
    });

    it("doesn't need to do auth handshake a second time", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      await client.sendCommand({ type: "ping" });
      await client.sendCommand({ type: "ping" });
      await client.close();
      server.close();
    });
  });
});
