import { BaseEntity } from "./base-entity.js";

export class Climate<T extends `climate.${string}`> extends BaseEntity<T> {
  public constructor(public readonly id: T) {
    super();
  }

  getClimate(): boolean {
    return true;
  }
}
