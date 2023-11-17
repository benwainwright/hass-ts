import { IEntityStore } from "../entity-store/i-entity-store.js";

export class HassApi {
  public constructor(public readonly entities: IEntityStore) {

  }
}