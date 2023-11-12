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
    it.todo("throws an error if the host is not a valid hostname");
    it.todo("throws an error if the port is not a valid port");
    it.todo("throws an error if the token is not a valid token");

    it("executes without error if all the inputs are valid", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      await client.init();
      await client.close();
      server.close();
    });
  });

  describe("init", () => {
    it.todo("resolves succesfully if the connection is established");
    it.todo("rejects the promise if the authentication fails");
    it.todo("rejects the promise if there is any connection errors");
  });

  describe("sendCommand", () => {
    it.todo("times out and throws an error after three seconds");
    it.todo("throws an error if it is called before init");

    it("initiates an auth handshake if the client is not authenticated and then returns the correct command response", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      await client.init();
      const result = await client.sendCommand({ type: "ping" });
      expect(result).toEqual({ message: "ping" });
      await client.close();
      server.close();
    });

    it("rejects the promise if the response indicates an error", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      await client.init();
      await expect(client.sendCommand({ type: "throw" })).rejects.toThrow(
        new HassTsError(TEST_ERROR_CODE, TEST_ERROR_MESSAGE),
      );
      await client.close();
      server.close();
    });

    it("doesn't need to do auth handshake a second time", async () => {
      const server = initialiseMockHassWebsocket(port, token, version);
      const client = new WebsocketClient(host, port, token);
      await client.init();
      await client.sendCommand({ type: "ping" });
      await client.sendCommand({ type: "ping" });
      await client.close();
      server.close();
    });
  });

  it.todo(
    "sends pings to the server regularly, closes the connection and reconnects if the server doesn't respond",
  );

  describe("subscribeToEvents", () => {
    it.todo("throws an error if it is called before init");

    it.todo(
      "allows the caller to supply a callback which will be called when an event is received",
    );
  });
});
