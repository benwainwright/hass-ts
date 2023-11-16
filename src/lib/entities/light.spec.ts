import { Light } from "./light.js";

describe("light", () => {
  it("constructs without errors and passes the id into the base-entity", () => {
    const light = new Light("light.foo");
    expect(light.id).toEqual("light.foo");
  });
});
