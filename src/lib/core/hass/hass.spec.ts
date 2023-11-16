import { Climate, Light } from "@entities";
import { Hass } from "./hass.js";
import { mock } from "vitest-mock-extended";
import { when } from "jest-when";
import { HassTsError } from "../errors/hass-ts-error.js";

describe("the hass client", () => {
  describe("constructor", () => {
    it("should construct without errors", () => {
      expect(() => new Hass([])).not.toThrow();
      expect(() => new Hass([mock(), mock()])).not.toThrow();
    });
  });

  describe("getEntities", () => {
    it("should return the correct entities", () => {
      const mockLightOne = new Light("light.foo");
      const mockLightTwo = new Light("light.bar");
      const mockClimateOne = new Climate("climate.baz");
      const mockClimateTwo = new Climate("climate.qux");

      const hass = new Hass([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      const { lightOne, lightTwo } = hass.getEntities({
        lightOne: "light.foo",
        lightTwo: "light.bar",
      });
      expect(lightOne).toBe(mockLightOne);
      expect(lightTwo).toBe(mockLightTwo);
    });

    it("should throw an error if any of the entities do not matxh", () => {
      const mockLightOne = new Light("light.foo");
      const mockLightTwo = new Light("light.bar");
      const mockClimateOne = new Climate("climate.baz");
      const mockClimateTwo = new Climate("climate.qux");

      const hass = new Hass([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      expect(() =>
        hass.getEntities({
          lightOne: "light.foo",
          lightTwo: "light.ba",
        })
      ).toThrow(new HassTsError("No entity found with id light.ba"));
    });
  });

  it("should throw an error if no entity is found", () => {
    const mockLightOne = new Light("light.foo");
    const mockLightTwo = new Light("light.bar");
    const mockClimateOne = new Climate("climate.baz");
    const mockClimateTwo = new Climate("climate.qux");

    const hass = new Hass([
      mockLightOne,
      mockLightTwo,
      mockClimateOne,
      mockClimateTwo,
    ]);

    expect(() => hass.getEntity("light.bip")).toThrow(
      new HassTsError("No entity found with id light.bip")
    );
  });

  describe("getDomainEntities", () => {
    it("should return an array containing entities for the associated domain only", () => {
      const mockLightOne = new Light("light.foo");
      const mockLightTwo = new Light("light.bar");
      const mockClimateOne = new Climate("climate.baz");
      const mockClimateTwo = new Climate("climate.qux");

      const hass = new Hass([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      const entities = hass.getDomainEntities("light");
      expect(entities).toEqual([mockLightOne, mockLightTwo]);
    });

    it("should return an empty array if there are genuinely no matching entities", () => {
      const mockLightOne = new Light("light.foo");
      const mockLightTwo = new Light("light.bar");

      const hass = new Hass([mockLightOne, mockLightTwo]);

      const entities = hass.getDomainEntities("climate");
      expect(entities).toEqual([]);
    });
  });

  describe("getEntity", () => {
    it("should return the correct entity", () => {
      const mockLightOne = new Light("light.foo");
      const mockLightTwo = new Light("light.bar");
      const mockClimateOne = new Climate("climate.baz");
      const mockClimateTwo = new Climate("climate.qux");

      const hass = new Hass([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      const lightTwo = hass.getEntity("light.bar");
      expect(lightTwo).toBe(mockLightTwo);
    });

    it("should throw an error if no entity is found", () => {
      const mockLightOne = new Light("light.foo");
      const mockLightTwo = new Light("light.bar");
      const mockClimateOne = new Climate("climate.baz");
      const mockClimateTwo = new Climate("climate.qux");

      const hass = new Hass([
        mockLightOne,
        mockLightTwo,
        mockClimateOne,
        mockClimateTwo,
      ]);

      expect(() => hass.getEntity("light.bip")).toThrow(
        new HassTsError("No entity found with id light.bip")
      );
    });
  });
});
