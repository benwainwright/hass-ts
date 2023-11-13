import { mock } from "vitest-mock-extended";
import { Client } from "./client";
import { WebsocketClient } from "../websocket-client/websocket-client";
import { vi } from "vitest";
import { when } from "jest-when";
import { MessageFromServer } from "../websocket-client";
import { mockEventData } from "./mock-event-data";
import { State } from "@types";

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe("The client", () => {
  describe("constructor", () => {
    it("executes without error", () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      expect(() => new Client(mockWebsocketClient)).not.toThrow();
    });
  });

  describe("getStates", () => {
    it("returns the results of a get_states command sent to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();

      const states = [mock<State[]>(), mock<State[]>(), mock<State[]>()];

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "get_states",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: states,
        });

      const client = new Client(mockWebsocketClient);

      const result = await client.getStates();
      expect(result).toEqual(states);
    });
  });

  describe("subscribeToEvents with no type argument", () => {
    it("sends a subscribe to events command to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient);
      const callback = vi.fn();

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "subscribe_events",
        })
        .mockResolvedValue({
          id: 8,
          type: "result",
          success: true,
          result: null,
        });

      await client.subscribeToEvents(callback);

      expect(mockWebsocketClient.sendCommand).toHaveBeenCalledWith({
        type: "subscribe_events",
      });
    });

    it("registers a callback that returns the corresponding event", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient);
      const callback = vi.fn();

      const EVENT_DELAY = 200;

      const message: MessageFromServer = {
        id: 1,
        type: "event",
        event: mockEventData,
      };

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "subscribe_events",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: null,
        });

      vi.mocked(mockWebsocketClient.addMessageListener).mockImplementation(
        (callback) => {
          setTimeout(() => {
            callback(message);
          }, EVENT_DELAY);
        },
      );
      await client.subscribeToEvents(callback);
      vi.advanceTimersByTime(400);

      expect(callback).toHaveBeenCalledWith(message.event);
    });

    it("only sends events corresponding with the original request", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient);
      const callback = vi.fn();

      const EVENT_DELAY = 200;

      const message: MessageFromServer = {
        id: 1,
        type: "event",
        event: mockEventData,
      };

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "subscribe_events",
        })
        .mockResolvedValue({
          id: 8,
          type: "result",
          success: true,
          result: null,
        });

      vi.mocked(mockWebsocketClient.addMessageListener).mockImplementation(
        (callback) => {
          setTimeout(() => {
            callback(message);
          }, EVENT_DELAY);
        },
      );
      await client.subscribeToEvents(callback);
      vi.advanceTimersByTime(400);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("subscribeToEvents with a type argument", () => {
    it("sends a subscribe to events command to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient);
      const callback = vi.fn();

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "subscribe_events",
          event_type: "foo",
          // This is horrible, but I don't quite understand why there is a type issue here
        } as Parameters<WebsocketClient["sendCommand"]>[0])
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: null,
        });

      await client.subscribeToEvents("foo", callback);

      expect(mockWebsocketClient.sendCommand).toHaveBeenCalledWith({
        type: "subscribe_events",
        event_type: "foo",
      });
    });

    it("registers a callback that returns the corresponding event", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient);
      const callback = vi.fn();

      const EVENT_DELAY = 200;

      const message: MessageFromServer = {
        id: 1,
        type: "event",
        event: mockEventData,
      };

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "subscribe_events",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: null,
        });

      vi.mocked(mockWebsocketClient.addMessageListener).mockImplementation(
        (callback) => {
          setTimeout(() => {
            callback(message);
          }, EVENT_DELAY);
        },
      );
      await client.subscribeToEvents(callback);
      vi.advanceTimersByTime(400);

      expect(callback).toHaveBeenCalledWith(message.event);
    });
  });
});
