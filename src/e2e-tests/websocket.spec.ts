import { initialiseClient } from "@core";
import { HassClientConfig } from "@types";
import {
  TEST_HASS_HOST,
  TEST_HASS_PORT,
  TEST_HASS_TOKEN,
} from "../test-support";

describe("The Hass SDK", () => {
  it("Correctly calls one of the get methods from the websocket API", async () => {
    const logger = {
      trace: console.log,
      debug: console.log,
      info: console.log,
      warn: console.log,
      error: console.log,
      fatal: console.log,
    };

    const config: HassClientConfig = {
      host: TEST_HASS_HOST,
      port: TEST_HASS_PORT,
      token: TEST_HASS_TOKEN,
      logger,
    };

    const client = await initialiseClient(config);

    const theConfig = await client.getConfig();
    expect(theConfig.time_zone).toEqual("Europe/London");
  });
});
