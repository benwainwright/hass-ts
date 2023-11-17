import { mock } from "vitest-mock-extended";

import { Logger } from "@types";
import {
  TEST_HASS_HOST,
  TEST_HASS_PORT,
  TEST_HASS_TOKEN,
  server,
} from "@test-support";

import { RestClient } from "./rest-client.js";
import { HassHttpError } from "@core/errors";
import { HTTP } from "@core/constants";

beforeEach(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  server.events.removeAllListeners();
});

describe("The REST client", () => {
  it("Logs requests and responses with trace logging", async () => {
    const logger = mock<Logger>();
    const client = new RestClient(
      TEST_HASS_HOST,
      TEST_HASS_PORT,
      TEST_HASS_TOKEN,
      logger
    );

    await client.post("/test", { testArg: "test" });

    expect(logger.trace).toHaveBeenCalledWith(
      `Request (http): POST /api/test body: [${JSON.stringify({
        testArg: "test",
      })}] response: (200) [${JSON.stringify({ result: "ok" })}]`
    );
  });

  it("Logs requests and responses with trace logging even when an error is returned", async () => {
    const logger = mock<Logger>();
    const client = new RestClient(
      TEST_HASS_HOST,
      TEST_HASS_PORT,
      "test-bad-token",
      logger
    );

    try {
      await client.post("/test", { testArg: "test" });
    } catch {
      // Do nothing
    }

    expect(logger.trace).toHaveBeenCalledWith(
      `Request (http): POST /api/test body: [${JSON.stringify({
        testArg: "test",
      })}] response: (401) [Unauthorized]`
    );
  });

  describe("get", () => {
    it("Throws an appropriate error if the endpoint returns a HTTP error", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        "bad-token",
        mock()
      );

      await expect(client.get("/test")).rejects.toThrow(
        new HassHttpError(HTTP.statusCodes.unauthorized, "Unauthorized")
      );
    });

    it("Makes the request to the correct endpoint with the token in the header", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock()
      );

      const result = await client.get("/test");

      expect(result).toEqual({ result: "ok" });
    });

    it("Caches responses sent with an etag and uses the cached response if server returns a 304", async () => {
      expect.assertions(3);
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock()
      );

      const resultOne = await client.get("/cache-test");
      expect(resultOne).toEqual("some text");

      server.events.on("response:mocked", ({ response }) => {
        expect(response.status).toEqual(HTTP.statusCodes.notModified);
      });

      const resultTwo = await client.get("/cache-test");
      expect(resultTwo).toEqual("some text");
    });

    it("works correctly for text only endpoints", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock()
      );

      const result = await client.get("/text");

      expect(result).toEqual("some text");
    });

    it("correctly normalises the request path", async () => {
      const client = new RestClient(
        TEST_HASS_HOST,
        TEST_HASS_PORT,
        TEST_HASS_TOKEN,
        mock()
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
        mock()
      );

      const result = await client.post("/test", { testArg: "test" });

      expect(result).toEqual({ result: "ok" });
    });
  });
});
