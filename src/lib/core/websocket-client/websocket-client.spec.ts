import { TEST_ERROR_CODE, TEST_ERROR_MESSAGE } from "src/test-support";
import { initialiseMockHassWebsocket } from "../../../test-support/mock-socket";
import { HassTsError } from "../errors/hass-ts-error";
import { WebsocketClient } from "./websocket-client";
import { ErrorResponseError } from "../errors/error-response-error";
import { ERRORS } from "../strings";

const host = "localhost";
const port = 123;
const token = "test-token";
const version = "1.2.3";

let server: ReturnType<typeof initialiseMockHassWebsocket>;

beforeAll(() => {
  server = initialiseMockHassWebsocket(port, token, version);
});

afterAll(() => {
  server.close();
});

describe("The websocket client", () => {
  describe("constructor", () => {
    it("throws an error if the host is an empty string", () => {
      expect(() => new WebsocketClient("", port, token)).toThrow(
        new HassTsError(ERRORS.hostCannotBeAnEmptyString),
      );
    });

    it("throws an error if the port is a negative number", () => {
      expect(() => new WebsocketClient(host, -512, token)).toThrow(
        new HassTsError(ERRORS.portCannotBeNegative),
      );
    });

    it("throws an error if the token is an empty string", () => {
      expect(() => new WebsocketClient(host, port, "")).toThrow(
        new HassTsError(ERRORS.tokenCannotBeAnEmptyString),
      );
    });

    it("executes without error if all the inputs are valid", async () => {
      const client = new WebsocketClient(host, port, token);
      await client.init();
      await client.close();
    });
  });

  describe("init", () => {
    it("resolves succesfully if the connection is established", async () => {
      const client = new WebsocketClient(host, port, token);
      await expect(client.init()).resolves.not.toThrow();
      await client.close();
    });

    it("rejects the promise if the authentication fails", async () => {
      const client = new WebsocketClient(host, port, "wrong-token");
      await expect(client.init()).rejects.toThrow(
        new HassTsError(ERRORS.authenticationFailed),
      );
      await client.close();
    });
    it.todo("rejects the promise if there is any connection errors");
  });

  describe("close", () => {
    it("resolves succesfully even if init hasn't been called", async () => {
      const client = new WebsocketClient(host, port, "wrong-token");
      await expect(client.close()).resolves.not.toThrow();
    });
  });

  describe("sendCommand", () => {
    it.todo("times out and throws an error after three seconds");
    it("throws an error if it is called before init", async () => {
      const client = new WebsocketClient(host, port, token);
      await expect(client.sendCommand({ type: "hello" })).rejects.toThrow(
        new HassTsError(ERRORS.notInitialised),
      );
    });

    it("initiates an auth handshake if the client is not authenticated and then returns the correct command response", async () => {
      const client = new WebsocketClient(host, port, token);
      await client.init();
      const result = await client.sendCommand({ type: "hello" });
      expect(result).toEqual({ message: "hey!" });
      await client.close();
    });

    it("rejects the promise if the response indicates an error", async () => {
      const client = new WebsocketClient(host, port, token);
      await client.init();
      await expect(client.sendCommand({ type: "throw" })).rejects.toThrow(
        new ErrorResponseError(TEST_ERROR_CODE, TEST_ERROR_MESSAGE),
      );
      await client.close();
    });

    it("doesn't need to do auth handshake a second time", async () => {
      const client = new WebsocketClient(host, port, token);
      await client.init();
      await client.sendCommand({ type: "hello" });

      // Mock websocket server is configured to fail on a second
      // auth request with the same socket
      await client.sendCommand({ type: "hello" });
      await client.close();
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
