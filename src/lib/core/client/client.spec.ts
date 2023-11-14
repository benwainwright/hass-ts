import { mock } from "vitest-mock-extended";
import { Client } from "./client";
import { WebsocketClient } from "../websocket-client/websocket-client";
import { vi } from "vitest";
import { when } from "jest-when";
import { MessageFromServer } from "../websocket-client";
import { mockEventData } from "./mock-event-data";
import {
  CalendarDetails,
  Config,
  EventDetails,
  Panel,
  Services,
  State,
} from "@types";
import { RestClient } from "../rest-client";

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
      expect(() => new Client(mockWebsocketClient, mock())).not.toThrow();
    });
  });

  describe("getCalendars", () => {
    it("calls the correct endpoint on the rest client and returns the result", async () => {
      const mockRestClient = mock<RestClient>();

      const details = mock<CalendarDetails>();

      when(mockRestClient.get)
        .calledWith("/calendars")
        .mockResolvedValue(details);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getCalendars();
      expect(result).toEqual(details);
    });
  });

  describe("getErrorLogs", () => {
    it("calls the correct endpoint on the rest client and returns the result", async () => {
      const mockRestClient = mock<RestClient>();

      const log = "a log";

      when(mockRestClient.get).calledWith("/error_log").mockResolvedValue(log);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getErrorLog();
      expect(result).toEqual(log);
    });
  });

  describe("getEvents", () => {
    it("calls the correct endpoint on the rest client and returns the result", async () => {
      const mockRestClient = mock<RestClient>();

      const events = [mock<EventDetails>(), mock<EventDetails>()];

      when(mockRestClient.get).calledWith("/events").mockResolvedValue(events);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getEvents();
      expect(result).toEqual(events);
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

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.getStates();
      expect(result).toEqual(states);
    });
  });

  describe("getConfig", () => {
    it("returns the results of a get_config command sent to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();

      const config = mock<Config>();

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "get_config",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: config,
        });

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.getConfig();
      expect(result).toEqual(config);
    });
  });

  describe("getServices", () => {
    it("returns the results of a get_services command sent to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();

      const services = mock<Services>();

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "get_services",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: services,
        });

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.getServices();
      expect(result).toEqual(services);
    });
  });

  describe("getPanels", () => {
    it("returns the results of a get_services command sent to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();

      const panels = {
        foo: mock<Panel>(),
        bar: mock<Panel>(),
      };

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "get_panels",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: panels,
        });

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.getPanels();
      expect(result).toEqual(panels);
    });
  });

  describe("subscribeToEvents with no type argument", () => {
    it("sends a subscribe to events command to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient, mock());
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
      const client = new Client(mockWebsocketClient, mock());
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
      const client = new Client(mockWebsocketClient, mock());
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
      const client = new Client(mockWebsocketClient, mock());
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
      const client = new Client(mockWebsocketClient, mock());
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
