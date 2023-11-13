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

beforeEach(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

describe("The REST client", () => {
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
