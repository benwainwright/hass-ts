import { vi } from "vitest";
import { getConfig } from "./get-config.js";
import { config } from "dotenv";

vi.mock("dotenv");

beforeEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
});

describe("get config", () => {
  it("should execute dotenv config", () => {
    vi.stubEnv("HASS_HOST", "localhost");
    vi.stubEnv("HASS_TOKEN", "token");
    getConfig();

    expect(config).toHaveBeenCalled();
  });

  it("should get values from the environment if they are present", () => {
    vi.stubEnv("HASS_HOST", "localhost");
    vi.stubEnv("HASS_TOKEN", "token");
    vi.stubEnv("HASS_WS_PATH", "/api/websocket");
    vi.stubEnv("HASS_HTTP_PATH", "/api");

    const { host, token, websocketPath, httpPath } = getConfig();

    expect(host).toEqual("localhost");
    expect(token).toEqual("token");
    expect(websocketPath).toEqual("/api/websocket");
    expect(httpPath).toEqual("/api");
  });

  it("if the supervisor token is set provides the correct values for token, paths, host and port", () => {
    vi.stubEnv("SUPERVISOR_TOKEN", "token");

    const { host, token, websocketPath, httpPath } = getConfig();

    expect(host).toEqual("supervisor");
    expect(token).toEqual("token");
    expect(websocketPath).toEqual("/core/websocket");
    expect(httpPath).toEqual("/core/api");
  });

  it("if paths and port are not set, defaults are provided", () => {
    vi.stubEnv("HASS_TOKEN", "token");
    vi.stubEnv("HASS_HOST", "host");

    const { host, token, websocketPath, httpPath } = getConfig();

    expect(host).toEqual("host");
    expect(token).toEqual("token");
    expect(websocketPath).toEqual("/api/websocket");
    expect(httpPath).toEqual("/api");
  });

  it("if host is not provided, an error is thrown", () => {
    vi.stubEnv("HASS_WS_PATH", "/api/websocket");
    vi.stubEnv("HASS_HTTP_PATH", "/api");
    vi.stubEnv("HASS_PORT", "80");
    vi.stubEnv("HASS_TOKEN", "token");

    expect(() => getConfig()).toThrow();
  });

  it("if token is not provided, an error is thrown", () => {
    vi.stubEnv("HASS_WS_PATH", "/api/websocket");
    vi.stubEnv("HASS_HTTP_PATH", "/api");
    vi.stubEnv("HASS_HOST", "host");
    vi.stubEnv("HASS_PORT", "80");

    expect(() => getConfig()).toThrow();
  });

  it("if port is not provided, an error is thrown", () => {
    vi.stubEnv("HASS_WS_PATH", "/api/websocket");
    vi.stubEnv("HASS_HTTP_PATH", "/api");
    vi.stubEnv("HASS_HOST", "host");
    vi.stubEnv("HASS_PORT", "");
    vi.stubEnv("HASS_TOKEN", "token");

    expect(() => getConfig()).toThrow();
  });
});
