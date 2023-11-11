import { functionTwo } from "./function-two";

describe("functionTwo", () => {
  it("should return Foo when called", () => {
    const result = functionTwo();
    expect(result).toEqual("Foo");
  });
});
