import { getTestClient } from "./get-test-client.js";

describe("The Hass SDK", () => {
  describe("getErrorLog", () => {
    it("returns a result which is a string", async () => {
      const client = await getTestClient();

      const errorLog = await client.getErrorLog();
      expect(typeof errorLog).toEqual("string");
      await client.close();
    });
  });

  describe("getConfig", () => {
    it("returns the time_zone from the server", async () => {
      const client = await getTestClient();

      const theConfig = await client.getConfig();
      expect(theConfig.time_zone).toEqual("Europe/London");
      await client.close();
    });
  });

  describe("callService", () => {
    it("turns the test switch off without a problem", async () => {
      const client = await getTestClient();

      const testSwitchId = "input_boolean.test_switch";

      const statesBefore = await client.getStates();

      const theSwitchBefore = statesBefore.find(
        (state) => state.entity_id === testSwitchId,
      );

      expect(theSwitchBefore?.state).toEqual("on");

      await client.callService({
        domain: "input_boolean",
        service: "turn_off",
        target: {
          entity_id: testSwitchId,
        },
      });

      const statesAfter = await client.getStates();

      const theSwitchAfter = statesAfter.find(
        (state) => state.entity_id === testSwitchId,
      );

      expect(theSwitchAfter?.state).toEqual("off");
    });
  });

  describe("getStates", () => {
    it("returns data of the correct format", async () => {
      const client = await getTestClient();

      const states = await client.getStates();
      expect(states).toBeInstanceOf(Array);
      expect(states.length).toBeGreaterThan(0);
      await client.close();
    });
  });

  describe("getState", () => {
    it("returns data from person.test_hass", async () => {
      const client = await getTestClient();

      const state = await client.getState("person.test_hass");

      expect(state.entity_id).toEqual("person.test_hass");
      expect(state.attributes.id).toEqual("test_hass");
      await client.close();
    });
  });
});
