import { BaseEntity, Client } from "@core";
import { IdType } from "./entity-list.js";

export class Light<T extends `light.${string}`> extends BaseEntity<T> {
  public constructor(_: T, id: string, client: Client) {
    super(id, "light", client);
  }

  public turnOn() {}

  public turnOff() {}

  public static make(id: IdType, client: Client): BaseEntity<IdType> {
    return new Light(`light.`, id, client);
  }
}
