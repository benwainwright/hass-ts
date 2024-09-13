import { vi } from "vitest";
import { when } from "jest-when";
import { mock } from "vitest-mock-extended";

import {
  CalendarDetails,
  Config,
  EventDetails,
  LogBookEntry,
  Panel,
  Service,
  ServiceDomainDetails,
  State,
} from "@types";

import {
  WebsocketClient,
  MessageFromServer,
  CallServiceCommand,
} from "@core/websocket-client";
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
          `/logbook/${timestamp.toISOString()}?entity=${entity}&end_time=${endTime.toISOString()}`,
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
        ",",
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
            ",",
          )}`,
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
            ",",
          )}&minimal_response=true&no_attributes=true`,
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

  describe("callService", () => {
    it("returns the results of a call_service command sent to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();

      const message: Omit<CallServiceCommand, "id"> = {
        type: "call_service",
        domain: "light",
        service: "turn_on",
      };

      const commandResult = {
        context: {
          id: "326ef27d19415c60c492fe330945f954",
          parent_id: null,
          user_id: "31ddb597e03147118cf8d2f8fbea5553",
        },
        response: { aResponse: "foo" },
      };

      when(mockWebsocketClient.sendCommand)
        .calledWith(message)
        .mockResolvedValue({
          id: 24,
          type: "result",
          success: true,
          result: commandResult,
        });

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.callService({
        domain: "light",
        service: "turn_on",
      });

      expect(result).toEqual(commandResult);
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

  describe("getEntities", () => {
    it("returns the results of a config/entity_registry/list command sent to the websocket client", async () => {
      const entities = [
        {
          area_id: null,
          categories: {},
          config_entry_id: "b86b3a75f5f90105b2904bafc7ff16e2",
          created_at: 1725723627.07158,
          device_id: null,
          disabled_by: null,
          entity_category: null,
          entity_id: "sensor.battery_2",
          has_entity_name: true,
          hidden_by: null,
          icon: null,
          id: "90333bf26191e55c561cf90ab123cff7",
          labels: [],
          modified_at: 1725723627.072837,
          name: null,
          options: {
            "cloud.alexa": {
              should_expose: false,
            },
            conversation: {
              should_expose: false,
            },
          },
          original_name: "Battery",
          platform: "mqtt",
          translation_key: null,
          unique_id: "Magic_Mouse_c4_0b_31_0a_ed_fd",
        },
        {
          area_id: null,
          categories: {},
          config_entry_id: "b86b3a75f5f90105b2904bafc7ff16e2",
          created_at: 1725724561.818439,
          device_id: "f2573047640f14820a65d1ae0c9a5f7e",
          disabled_by: null,
          entity_category: null,
          entity_id:
            "sensor.magic_keyboard_with_numeric_keypad_battery_battery",
          has_entity_name: true,
          hidden_by: null,
          icon: null,
          id: "3ca7200cd9fab9e80b55b41004a71b68",
          labels: ["battery"],
          modified_at: 1725732307.803289,
          name: "Magic Keyboard",
          options: {
            "cloud.alexa": {
              should_expose: false,
            },
            conversation: {
              should_expose: false,
            },
            sensor: {
              display_precision: null,
            },
          },
          original_name: "Battery",
          platform: "mqtt",
          translation_key: null,
          unique_id: "magic_keyboard_with_numeric_keypad_90_9c_4a_08_c4_ce",
        },
        {
          area_id: null,
          categories: {},
          config_entry_id: "b86b3a75f5f90105b2904bafc7ff16e2",
          created_at: 1725724561.823466,
          device_id: "e4404dbac83109bf6b0927a0abe2c876",
          disabled_by: null,
          entity_category: null,
          entity_id: "sensor.magic_mouse_battery_battery",
          has_entity_name: true,
          hidden_by: null,
          icon: null,
          id: "56946c51acbda8086d096c7cfcddb474",
          labels: ["battery"],
          modified_at: 1725732312.421748,
          name: "Magic Mouse",
          options: {
            "cloud.alexa": {
              should_expose: false,
            },
            conversation: {
              should_expose: false,
            },
            sensor: {
              display_precision: null,
            },
          },
          original_name: "Battery",
          platform: "mqtt",
          translation_key: null,
          unique_id: "magic_mouse_c4_0b_31_0a_ed_fd",
        },
      ];
      const mockWebsocketClient = mock<WebsocketClient>();

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "config/entity_registry/list",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: entities,
        });

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.getEntities();
      expect(result).toEqual(entities);
    });
  });

  describe("getDevices", () => {
    it("returns the results of a config/device_registry/list command sent to the websocket client", async () => {
      const devices = [
        {
          area_id: null,
          configuration_url: null,
          config_entries: ["01J6ZJHE0Z6J0B04NJ0GWMPHFG"],
          connections: [],
          created_at: 1725650356.989378,
          disabled_by: null,
          entry_type: null,
          hw_version: null,
          id: "bf3dc401994ef5b76ae10b6a1aa9f904",
          identifiers: [["jellyfin", "DDE349A2-4862-4119-97AF-24D44577641B"]],
          labels: [],
          manufacturer: "Jellyfin",
          model: "Infuse-Direct",
          model_id: null,
          modified_at: 1725650356.989459,
          name_by_user: null,
          name: "Apple TV",
          primary_config_entry: "01J6ZJHE0Z6J0B04NJ0GWMPHFG",
          serial_number: null,
          sw_version: "7.8.2",
          via_device_id: "642bfac6f2dddddc4048b01fe4d770c4",
        },
        {
          area_id: null,
          configuration_url: null,
          config_entries: ["b86b3a75f5f90105b2904bafc7ff16e2"],
          connections: [],
          created_at: 1725724561.817846,
          disabled_by: null,
          entry_type: null,
          hw_version: null,
          id: "f2573047640f14820a65d1ae0c9a5f7e",
          identifiers: [
            [
              "mqtt",
              "device_magic_keyboard_with_numeric_keypad_90_9c_4a_08_c4_ce",
            ],
          ],
          labels: [],
          manufacturer: null,
          model: null,
          model_id: null,
          modified_at: 1725724561.817901,
          name_by_user: null,
          name: "Magic Keyboard with Numeric Keypad battery",
          primary_config_entry: "b86b3a75f5f90105b2904bafc7ff16e2",
          serial_number: null,
          sw_version: null,
          via_device_id: null,
        },
        {
          area_id: null,
          configuration_url: null,
          config_entries: ["b86b3a75f5f90105b2904bafc7ff16e2"],
          connections: [],
          created_at: 1725724561.823048,
          disabled_by: null,
          entry_type: null,
          hw_version: null,
          id: "e4404dbac83109bf6b0927a0abe2c876",
          identifiers: [["mqtt", "device_magic_mouse_c4_0b_31_0a_ed_fd"]],
          labels: [],
          manufacturer: null,
          model: null,
          model_id: null,
          modified_at: 1725724561.823094,
          name_by_user: null,
          name: "Magic Mouse battery",
          primary_config_entry: "b86b3a75f5f90105b2904bafc7ff16e2",
          serial_number: null,
          sw_version: null,
          via_device_id: null,
        },
      ];
      const mockWebsocketClient = mock<WebsocketClient>();

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "config/device_registry/list",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: devices,
        });

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.getDevices();
      expect(result).toEqual(devices);
    });
  });

  describe("getAreas", () => {
    it("returns the results of a config/areas_registry/list command sent to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();

      const areas = [
        {
          aliases: ["My Bedroom", "The Bedroom"],
          area_id: "bedroom",
          floor_id: null,
          icon: null,
          labels: [],
          name: "Bedroom",
          picture: "/api/image/serve/c2443ee11daec25a1405093527ef8a1b/512x512",
          created_at: 0,
          modified_at: 0,
        },
        {
          aliases: [],
          area_id: "gym",
          floor_id: null,
          icon: null,
          labels: [],
          name: "Spare Room",
          picture: null,
          created_at: 0,
          modified_at: 1723855811.95857,
        },
        {
          aliases: ["The Bathroom", "Toilet", "The Toilet", "My Bathroom"],
          area_id: "main_bathroom",
          floor_id: null,
          icon: null,
          labels: [],
          name: "Bathroom",
          picture: "/api/image/serve/fd833e8a0d6e034b2014568152ae9b7d/512x512",
          created_at: 0,
          modified_at: 0,
        },
        {
          aliases: ["The Hallway"],
          area_id: "hallway",
          floor_id: null,
          icon: null,
          labels: [],
          name: "Hallway",
          picture: "/api/image/serve/fd2577e8e26790899e7d321414836bd3/512x512",
          created_at: 0,
          modified_at: 0,
        },
        {
          aliases: [],
          area_id: "living_room",
          floor_id: null,
          icon: null,
          labels: [],
          name: "Living Room",
          picture: "/api/image/serve/b43c6ff06ca1dad1adde8514a5431ecd/512x512",
          created_at: 0,
          modified_at: 0,
        },
      ];

      when(mockWebsocketClient.sendCommand)
        .calledWith({
          type: "config/area_registry/list",
        })
        .mockResolvedValue({
          id: 1,
          type: "result",
          success: true,
          result: areas,
        });

      const client = new Client(mockWebsocketClient, mock());

      const result = await client.getAreas();
      expect(result).toEqual(areas);
    });
  });

  describe("getServices", () => {
    it("returns the results of a get_services command sent to the websocket client", async () => {
      const mockWebsocketClient = mock<WebsocketClient>();

      const services = mock<Record<string, Service>>();

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
