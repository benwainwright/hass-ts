import { Climate } from "./climate.js";

describe("climate", () => {
  it("constructs without errors and passes the id into the base-entity", () => {
    const climate = new Climate("climate.foo");
    expect(climate.id).toEqual("climate.foo");
  });
});
