import { Logger } from "@types";
import {
  TEST_ERROR_CODE,
  TEST_ERROR_MESSAGE,
  initialiseMockHassWebsocket,
} from "@test-support";
import { WebsocketClient } from "./websocket-client.js";

import { vi } from "vitest";
import { mock } from "vitest-mock-extended";

import { ERRORS } from "../strings.js";
import { ErrorResponseError, HassTsError } from "../errors/index.js";

const host = "localhost";
const port = 1234;
const token = "test-token";
const version = "1.2.3";

let server: ReturnType<typeof initialiseMockHassWebsocket>;

beforeAll(() => {
  vi.useFakeTimers();
  server = initialiseMockHassWebsocket(port, token, version);
});

afterAll(() => {
  vi.useRealTimers();
  server.close();
});

describe("The websocket client", () => {
  describe("constructor", () => {
    it("throws an error if the host is an empty string", () => {
      expect(() => new WebsocketClient("", port, token, mock())).toThrow(
        new HassTsError(ERRORS.hostCannotBeAnEmptyString),
      );
    });

    it("throws an error if the port is a negative number", () => {
      expect(() => new WebsocketClient(host, -512, token, mock())).toThrow(
        new HassTsError(ERRORS.portCannotBeNegative),
      );
    });

    it("throws an error if the token is an empty string", () => {
      expect(() => new WebsocketClient(host, port, "", mock())).toThrow(
        new HassTsError(ERRORS.tokenCannotBeAnEmptyString),
      );
    });

    it("executes without error if all the inputs are valid", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await client.init();
      await client.close();
    });
  });

  it("correctly logs all messages from the socket with trace logging", async () => {
    const logger = mock<Logger>();
    const client = new WebsocketClient(host, port, token, logger);
    await client.init();

    expect(logger.trace).toHaveBeenCalledWith(
      `Received (ws): ${JSON.stringify({
        type: "auth_required",
        ha_version: version,
      })}`,
    );
    await client.close();
  });

  it("correctly logs all messages sent to the socket with trace logging", async () => {
    const logger = mock<Logger>();
    const client = new WebsocketClient(host, port, token, logger);
    await client.init();

    expect(logger.trace).toHaveBeenCalledWith(
      `Sent (ws): ${JSON.stringify({
        type: "auth",
        access_token: token,
      })}`,
    );

    await client.close();
  });

  describe("init", () => {
    it("resolves succesfully if the connection is established", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await expect(client.init()).resolves.not.toThrow();
      await client.close();
    });

    it("rejects the promise if the authentication fails", async () => {
      const client = new WebsocketClient(host, port, "wrong-token", mock());
      await expect(client.init()).rejects.toThrow(
        new HassTsError(ERRORS.authenticationFailed),
      );
      await client.close();
    });
    it.todo("rejects the promise if there is any connection errors");
  });

  describe("close", () => {
    it("resolves succesfully even if init hasn't been called", async () => {
      const client = new WebsocketClient(host, port, "wrong-token", mock());
      await expect(client.close()).resolves.not.toThrow();
    });
  });

  describe("addMessageListener", () => {
    it("throws an error if it is called before init", () => {
      const client = new WebsocketClient(host, port, token, mock());
      expect(() => {
        client.addMessageListener(vi.fn());
      }).toThrow(new HassTsError(ERRORS.notInitialised));
    });

    it("allows the caller to supply a callback which will be called when a message is received", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await client.init();
      const callback = vi.fn();
      client.addMessageListener(callback);
      expect(callback).not.toHaveBeenCalled();
      const ONE_SECOND = 1000;
      await vi.advanceTimersByTimeAsync(2 * ONE_SECOND);
      expect(callback).toHaveBeenCalledWith({
        type: "test",
        testMessage: "test",
      });
      await client.close();
    });

    it("does not trigger callback for messages that are consumed by the client", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await client.init();
      const callback = vi.fn();
      client.addMessageListener(callback);
      const ONE_SECOND = 1000;
      await vi.advanceTimersByTimeAsync(2 * ONE_SECOND);
      expect(callback).toHaveBeenCalledTimes(1);
      await client.close();
    });
  });

  describe("removeMessageListener", () => {
    it("throws an error if the callback was not previously registered", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await client.init();
      const callback = vi.fn();
      expect(() => {
        client.removeMessageListener(callback);
      }).toThrow(new HassTsError(ERRORS.callbackNotRegistered));
      await client.close();
    });

    it("throws an error if called before init", () => {
      const client = new WebsocketClient(host, port, token, mock());
      expect(() => {
        client.removeMessageListener(vi.fn());
      }).toThrow(new HassTsError(ERRORS.notInitialised));
    });

    it("stops the listener being triggered when a message is received", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await client.init();
      const callback = vi.fn();
      client.addMessageListener(callback);
      expect(callback).not.toHaveBeenCalled();
      const ONE_SECOND = 1000;
      client.removeMessageListener(callback);
      await vi.advanceTimersByTimeAsync(2 * ONE_SECOND);
      expect(callback).not.toHaveBeenCalled();
      await client.close();
    });
  });

  describe("sendCommand", () => {
    it.todo("times out and throws an error after three seconds");

    it("throws an error if it is called before init", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await expect(client.sendCommand({ type: "hello" })).rejects.toThrow(
        new HassTsError(ERRORS.notInitialised),
      );
    });

    it("initiates an auth handshake if the client is not authenticated and then returns the correct command response", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await client.init();
      const result = await client.sendCommand({ type: "hello" });
      expect(result).toEqual({
        id: expect.any(Number),
        type: "result",
        success: true,
        result: { message: "hey!" },
      });
      await client.close();
    });

    it("rejects the promise if the response indicates an error", async () => {
      const client = new WebsocketClient(host, port, token, mock());
      await client.init();
      await expect(client.sendCommand({ type: "throw" })).rejects.toThrow(
        new ErrorResponseError(TEST_ERROR_CODE, TEST_ERROR_MESSAGE),
      );
      await client.close();
    });

    it("doesn't need to do auth handshake a second time", async () => {
      const client = new WebsocketClient(host, port, token, mock());
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
});
