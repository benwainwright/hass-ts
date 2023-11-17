import { mock } from "vitest-mock-extended";
import { Light } from "./light.js";

describe("light", () => {
  it("constructs without errors and passes the id into the base-entity", () => {
    const light = new Light("light.foo", mock());
    expect(light.id).toEqual("light.foo");
  });
});
