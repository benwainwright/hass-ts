import { functionOne } from "./function-one";

describe("functionOne", () => {
  it("should return Foo when called", () => {
    const result = functionOne();
    expect(result).toEqual("Foo");
  });
});
