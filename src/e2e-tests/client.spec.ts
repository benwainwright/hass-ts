import { initialiseClient } from "@core";
import { HassClientConfig } from "@types";
import {
  TEST_HASS_HOST,
  TEST_HASS_PORT,
  TEST_HASS_TOKEN,
} from "../test-support";

describe("The Hass SDK", () => {
  describe("getErrorLog", () => {
    it("returns a result which is a string", async () => {
      const config: HassClientConfig = {
        host: TEST_HASS_HOST,
        port: TEST_HASS_PORT,
        token: TEST_HASS_TOKEN,
      };

      const client = await initialiseClient(config);

      const errorLog = await client.getErrorLog();
      expect(typeof errorLog).toEqual("string");
      await client.close();
    });
  });

  describe("getConfig", () => {
    it("returns the time_zone from the server", async () => {
      const config: HassClientConfig = {
        host: TEST_HASS_HOST,
        port: TEST_HASS_PORT,
        token: TEST_HASS_TOKEN,
      };

      const client = await initialiseClient(config);

      const theConfig = await client.getConfig();
      expect(theConfig.time_zone).toEqual("Europe/London");
      await client.close();
    });
  });
});
