import { isKeyOf } from "./is-key-of.js";

describe("isKeyOf", () => {
  it("should return true if key is a key of thing", () => {
    const result = isKeyOf({ a: 1 }, "a");
    expect(result).toBe(true);
  });

  it("should return false if key is not a key of thing", () => {
    const result = isKeyOf({ a: 1 }, "b");
    expect(result).toBe(false);
  });
});
