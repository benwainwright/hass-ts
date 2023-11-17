import { BaseEntity } from "./base-entity.js";

export class Climate<T extends `climate.${string}`> extends BaseEntity<T> {
  public constructor(id: T) {
    super(id);
  }
}
