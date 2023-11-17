import { BaseEntity } from "./base-entity.js";

export class Light<T extends `light.${string}`> extends BaseEntity<T> {
  public constructor(id: T) {
    super(id);
  }
}
