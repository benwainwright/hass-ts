import { Climate, Light } from "@entities";
import { HassTsError } from "@core/errors";

import { mock } from "vitest-mock-extended";
import { EntityStore } from "./entity-store.js";

describe("the entity store", () => {
  describe("constructor", () => {
    it("should construct without errors", () => {
      expect(() => new EntityStore([])).not.toThrow();
      expect(() => new EntityStore([mock(), mock()])).not.toThrow();
    });
  });

  describe("get", () => {
    it("should return the correct entity if passed a string", () => {
      const mockLightOne = new Light("light.foo", mock());
      const mockLightTwo = new Light("light.bar", mock());
      const mockClimateOne = new Climate("climate.baz", mock());
      const mockClimateTwo = new Climate("climate.qux", mock());

      const hass = new EntityStore([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      const lightTwo = hass.get("light.bar");
      expect(lightTwo).toBe(mockLightTwo);
    });

    it("should throw an error if passed a string and no entity is found", () => {
      const mockLightOne = new Light("light.foo", mock());
      const mockLightTwo = new Light("light.bar", mock());
      const mockClimateOne = new Climate("climate.baz", mock());
      const mockClimateTwo = new Climate("climate.qux", mock());

      const hass = new EntityStore([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      expect(() => hass.get("light.bip")).toThrow(
        new HassTsError("No entity found with id light.bip")
      );
    });
    it("should return the correct entities when passed an object", () => {
      const mockLightOne = new Light("light.foo", mock());
      const mockLightTwo = new Light("light.bar", mock());
      const mockClimateOne = new Climate("climate.baz", mock());
      const mockClimateTwo = new Climate("climate.qux", mock());

      const hass = new EntityStore([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      const { lightOne, lightTwo } = hass.get({
        lightOne: "light.foo",
        lightTwo: "light.bar",
      });
      expect(lightOne).toBe(mockLightOne);
      expect(lightTwo).toBe(mockLightTwo);
    });

    it("should throw an error if any of the entities do not match and passed an object", () => {
      const mockLightOne = new Light("light.foo", mock());
      const mockLightTwo = new Light("light.bar", mock());
      const mockClimateOne = new Climate("climate.baz", mock());
      const mockClimateTwo = new Climate("climate.qux", mock());

      const hass = new EntityStore([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      expect(() =>
        hass.get({
          lightOne: "light.foo",
          lightTwo: "light.ba",
        })
      ).toThrow(new HassTsError("No entity found with id light.ba"));
    });
  });

  it("should throw an error if no entity is found", () => {
    const mockLightOne = new Light("light.foo", mock());
    const mockLightTwo = new Light("light.bar", mock());
    const mockClimateOne = new Climate("climate.baz", mock());
    const mockClimateTwo = new Climate("climate.qux", mock());

    const hass = new EntityStore([
      mockLightOne,
      mockLightTwo,
      mockClimateOne,
      mockClimateTwo,
    ]);

    expect(() => hass.get("light.bip")).toThrow(
      new HassTsError("No entity found with id light.bip")
    );
  });

  describe("getDomainEntities", () => {
    it("should return an array containing entities for the associated domain only", () => {
      const mockLightOne = new Light("light.foo", mock());
      const mockLightTwo = new Light("light.bar", mock());
      const mockClimateOne = new Climate("climate.baz", mock());
      const mockClimateTwo = new Climate("climate.qux", mock());

      const hass = new EntityStore([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      const entities = hass.getFromDomain("light");
      expect(entities).toEqual([mockLightOne, mockLightTwo]);
    });

    it("should return an empty array if there are genuinely no matching entities", () => {
      const mockLightOne = new Light("light.foo", mock());
      const mockLightTwo = new Light("light.bar", mock());

      const hass = new EntityStore([mockLightOne, mockLightTwo]);

      const entities = hass.getFromDomain("climate");
      expect(entities).toEqual([]);
    });
  });
});
