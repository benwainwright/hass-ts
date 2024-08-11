import { BaseEntity, Client } from "@core";
import { IdType } from "./entity-list.js";

export class Climate<T extends `climate.${string}`> extends BaseEntity<T> {
  public constructor(_: T, id: string, client: Client) {
    super(id, "climate", client);
  }

  public static make(id: IdType, client: Client): BaseEntity<IdType> {
    return new Climate("climate.", id, client);
  }
}
