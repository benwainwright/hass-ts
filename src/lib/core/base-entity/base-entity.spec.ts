import { Client } from "@core";
import { mock } from "vitest-mock-extended";
import { BaseEntity } from "./base-entity.js";

describe("a class derived from base-entity", () => {
  it("sets id to the value passed in", () => {
    class Foo extends BaseEntity<`light.${string}`> {
      public constructor(id: `light.${string}`, client: Client) {
        super(id, client);
      }
    }

    const foo = new Foo("light.foo", mock());
    expect(foo.id).toBe("light.foo");
  });
  describe("matchesId", () => {
    it("returns false if the instance doesn't match", () => {
      class Foo extends BaseEntity<`light.${string}`> {
        public constructor(id: `light.${string}`, client: Client) {
          super(id, client);
        }
      }

      const foo = new Foo("light.foo", mock());
      const result = foo.matchesId("light.foo", mock());
      expect(result).toBe(false);
    });
    it("returns true if the id matches", () => {
      class Foo extends BaseEntity<`light.${string}`> {
        public constructor(id: `light.${string}`, client: Client) {
          super(id, client);
        }
      }

      const foo = new Foo("light.foo", mock());
      const result = foo.matchesId("light.foo", foo);
      expect(result).toBe(true);
    });

    it("returns false if the id does not match", () => {
      class Foo extends BaseEntity<`light.${string}`> {
        public constructor(id: `light.${string}`, client: Client) {
          super(id, client);
        }
      }

      const foo = new Foo("light.foo", mock());
      const result = foo.matchesId("light.bar", foo);
      expect(result).toBe(false);
    });
  });

  describe("matchesDomain", () => {
    it("returns false if the instance doesn't match", () => {
      class Foo extends BaseEntity<`light.${string}`> {
        public constructor(id: `light.${string}`, client: Client) {
          super(id, client);
        }
      }

      const foo = new Foo("light.foo", mock());
      const result = foo.matchesDomain("light", mock());
      expect(result).toBe(false);
    });
    it("returns true if the domain of the current object matches the string that is passed in", () => {
      class Foo extends BaseEntity<`light.${string}`> {
        public constructor(id: `light.${string}`, client: Client) {
          super(id, client);
        }
      }

      const foo = new Foo("light.foo", mock());
      const result = foo.matchesDomain("light", foo);
      expect(result).toBe(true);
    });

    it("returns false if the domain of the current object does not match the string that is passed in", () => {
      class Foo extends BaseEntity<`light.${string}`> {
        public constructor(id: `light.${string}`, client: Client) {
          super(id, client);
        }
      }

      const foo = new Foo("light.foo", mock());
      const result = foo.matchesDomain("climate" as "light", foo);
      expect(result).toBe(false);
    });
  });
});
