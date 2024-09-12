import { HassConfig } from "@types";
import { TEST_HASS_HOST, TEST_HASS_PORT, TEST_HASS_TOKEN } from "@test-support";
import { initialiseClient } from "@test-support/package-intercept";
import { getConfig } from "@core";

export const getTestClient = async () => {
  const defaultConfig = getConfig();

  const config: Partial<HassConfig> = {
    host: TEST_HASS_HOST,
    port: TEST_HASS_PORT,
    token: TEST_HASS_TOKEN,
  };

  return await initialiseClient({ ...defaultConfig, ...config });
};
