import { mock } from "vitest-mock-extended";
import { Client } from "./client";
import { WebsocketClient } from "../websocket-client/websocket-client";
import { vi } from "vitest";

describe("The client", () => {
  describe("constructor", () => {
    it("executes without error", () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      expect(() => new Client(mockWebsocketClient)).not.toThrow();
    });
  });

  describe("subscribeToEvents with no type argument", () => {
    it("sends a subscribe to events command to the websocket client and then registers an event callback", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient);
      const callback = vi.fn();

      await client.subscribeToEvents(callback);

      expect(mockWebsocketClient.sendCommand).toHaveBeenCalledWith({
        type: "subscribe_events",
      });

      expect(mockWebsocketClient.addMessageListener).toHaveBeenCalledWith(
        callback,
      );
    });
  });

  describe("subscribeToEvents with a type argument", () => {
    it("sends a subscribe to events command with the correct type to the websocket client and then registers an event callback", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient);
      const callback = vi.fn();

      await client.subscribeToEvents("foo", callback);

      expect(mockWebsocketClient.sendCommand).toHaveBeenCalledWith({
        type: "subscribe_events",
        event_type: "foo",
      });

      expect(mockWebsocketClient.addMessageListener).toHaveBeenCalledWith(
        callback,
      );
    });
  });
});
