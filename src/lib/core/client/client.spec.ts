import { vi } from "vitest";
import { when } from "jest-when";
import { mock } from "vitest-mock-extended";

import {
  CalendarDetails,
  Config,
  EventDetails,
  LogBookEntry,
  Panel,
  ServiceDomainDetails,
  Services,
  State,
} from "@types";

import { WebsocketClient, MessageFromServer } from "@core/websocket-client";
import { RestClient } from "@core/rest-client";

import { Client } from "./client.js";
import { mockEventData } from "./mock-event-data.js";

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

  describe("getState", () => {
    it("calls the correct endpoint on the rest client and returns the result", async () => {
      const mockRestClient = mock<RestClient>();

      const state = mock<State>();

      const entity = "light.bedroom";

      when(mockRestClient.get)
        .calledWith(`/states/${entity}`)
        .mockResolvedValue(state);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getState(entity);
      expect(result).toEqual(state);
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
  describe("getLogbook", () => {
    it("calls the correct method endpoint when no params are provided", async () => {
      const mockRestClient = mock<RestClient>();

      const entries = mock<LogBookEntry[]>();

      const path = `/logbook`;

      when(mockRestClient.get).calledWith(path).mockResolvedValue(entries);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getLogbook();

      expect(result).toEqual(entries);
    });

    it("when timestamp is supplied it adds to the end of the path", async () => {
      const mockRestClient = mock<RestClient>();

      const entries = mock<LogBookEntry[]>();

      const timestamp = new Date(2023, 0, 1);

      when(mockRestClient.get)
        .calledWith(`/logbook/2023-01-01T00:00:00.000Z`)
        .mockResolvedValue(entries);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getLogbook({ timestamp });

      expect(result).toEqual(entries);
    });

    it("adds other params to the queryString", async () => {
      const mockRestClient = mock<RestClient>();

      const entries = mock<LogBookEntry[]>();

      const entity = "light.bedroom";

      const timestamp = new Date(2023, 0, 1);
      const endTime = new Date(2023, 0, 2);

      when(mockRestClient.get)
        .calledWith(
          `/logbook/${timestamp.toISOString()}?entity=${entity}&end_time=${endTime.toISOString()}`
        )
        .mockResolvedValue(entries);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getLogbook({
        entity,
        timestamp,
        endTime,
      });

      expect(result).toEqual(entries);
    });
  });

  describe("getHistory", () => {
    it("calls the correct method endpoint when no timestamp or params other than filter_entity are provided", async () => {
      const mockRestClient = mock<RestClient>();

      const states = mock<State[][]>();

      const filterEntityId = ["light.bedroom", "light.lounge"];
      const path = `/history/period?filter_entity_id=${filterEntityId.join(
        ","
      )}`;

      when(mockRestClient.get).calledWith(path).mockResolvedValue(states);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getHistory({ filterEntityId });

      expect(result).toEqual(states);
    });

    it("when timestamp is supplied it adds to the end of the path", async () => {
      const mockRestClient = mock<RestClient>();

      const states = mock<State[][]>();

      const filterEntityId = ["light.bedroom", "light.lounge"];
      const timestamp = new Date(2023, 0, 1);

      when(mockRestClient.get)
        .calledWith(
          `/history/period/2023-01-01T00:00:00.000Z?filter_entity_id=${filterEntityId.join(
            ","
          )}`
        )
        .mockResolvedValue(states);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getHistory({ filterEntityId, timestamp });

      expect(result).toEqual(states);
    });

    it("adds other params to the queryString", async () => {
      const mockRestClient = mock<RestClient>();

      const states = mock<State[][]>();

      const filterEntityId = ["light.bedroom", "light.lounge"];
      const timestamp = new Date(2023, 0, 1);

      when(mockRestClient.get)
        .calledWith(
          `/history/period/2023-01-01T00:00:00.000Z?filter_entity_id=${filterEntityId.join(
            ","
          )}&minimal_response=true&no_attributes=true`
        )
        .mockResolvedValue(states);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getHistory({
        filterEntityId,
        timestamp,
        minimalResponse: true,
        noAttributes: true,
      });

      expect(result).toEqual(states);
    });
  });

  describe("close", () => {
    it("calls the close method on the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();
      const client = new Client(mockWebsocketClient, mock());
      await client.close();
      expect(mockWebsocketClient.close).toHaveBeenCalled();
    });
  });

  describe("getServices", () => {
    it("calls the correct endpoint on the rest client and returns the result", async () => {
      const mockRestClient = mock<RestClient>();

      const serviceDomains = [
        mock<ServiceDomainDetails>(),
        mock<ServiceDomainDetails>(),
      ];

      when(mockRestClient.get)
        .calledWith("/services")
        .mockResolvedValue(serviceDomains);

      const client = new Client(mock(), mockRestClient);

      const result = await client.getServiceDomains();
      expect(result).toEqual(serviceDomains);
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
        }
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
        }
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
        }
      );
      await client.subscribeToEvents(callback);
      vi.advanceTimersByTime(400);

      expect(callback).toHaveBeenCalledWith(message.event);
    });
  });
});
