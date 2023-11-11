import { vi } from "vitest";
import { initialiseMockHassWebsocket } from "./mock-socket";
import { WebsocketClient } from "./websocket-client";
import WebSocket from "ws";

describe("The websocket client", () => {
  // describe("constructor", () => {
  //   it("executes without error", () => {
  //     new WebsocketClient("localhost", 8123, "baz");
  //   });
  // });

  describe("sendCommand", () => {
    it("initiates an auth handshake if the client is not authenticated and then returns the correct command response", async () => {
      const host = "localhost";
      const port = 123;
      const token = "test-token";
      const version = "1.2.3";

      initialiseMockHassWebsocket(port, token, version);

      const client = new WebsocketClient(host, port, token);

      const result = await client.sendCommand({ type: "ping" });

      expect(result).toEqual({ message: "ping" });
    });
  });
});
