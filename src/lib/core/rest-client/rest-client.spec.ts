import { mock } from "vitest-mock-extended";
import {
  TEST_HASS_HOST,
  TEST_HASS_PORT,
  TEST_HASS_TOKEN,
  server,
} from "../../../test-support";
import { RestClient } from "./rest-client";
import { HassHttpError } from "../errors/hass-http-error";
import { HTTP } from "../constants";
import { Logger } from "@types";

beforeEach(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

describe("The REST client", () => {
  it("Logs requests and responses with trace logging", async () => {
    const logger = mock<Logger>();
    const client = new RestClient(
      TEST_HASS_HOST,
      TEST_HASS_PORT,
      TEST_HASS_TOKEN,
      logger,
    );

    await client.post("/test", { testArg: "test" });

    expect(logger.trace).toHaveBeenCalledWith(
      `Request (http): POST /api/test body: [${JSON.stringify({
        testArg: "test",
      })}] response: (200) [${JSON.stringify({ result: "ok" })}]`,
    );
  });

  it("Logs requests and responses with trace logging even when an error is returned", async () => {
    const logger = mock<Logger>();
    const client = new RestClient(
      TEST_HASS_HOST,
      TEST_HASS_PORT,
      "test-bad-token",
      logger,
    );

    try {
      await client.post("/test", { testArg: "test" });
    } catch {
      // Do nothing
    }

    expect(logger.trace).toHaveBeenCalledWith(
      `Request (http): POST /api/test body: [${JSON.stringify({
        testArg: "test",
      })}] response: (401) [Unauthorized]`,
    );
  });

  describe("get", () => {
    it("Throws an appropriate error if the endpoint returns a HTTP error", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        "bad-token",
        mock(),
      );

      await expect(client.get("/test")).rejects.toThrow(
        new HassHttpError(HTTP.statusCodes.unauthorized, "Unauthorized"),
      );
    });

    it("Makes the request to the correct endpoint with the token in the header", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock(),
      );

      const result = await client.get("/test");

      expect(result).toEqual({ result: "ok" });
    });

    it("works correctly for text only endpoints", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock(),
      );

      const result = await client.get("/text");

      expect(result).toEqual("some text");
    });

    it("correctly normalises the request path", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock(),
      );

      const result = await client.get("test");

      expect(result).toEqual({ result: "ok" });
    });
  });

  describe("post", () => {
    it("Makes the request to the correct endpoint with the token in the header", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock(),
      );

      const result = await client.post("/test", { testArg: "test" });

      expect(result).toEqual({ result: "ok" });
    });
  });
});
