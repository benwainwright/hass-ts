import { Client } from "@core";
import { EntityWithMatchingId, GetDomain, IdType } from "./entities.js";
import { Entity } from "./entity.js";

export abstract class BaseEntity<T extends IdType> {
  protected constructor(
    public readonly id: T,
    protected readonly client: Client
  ) {}

  public matchesId<ET extends T>(
    id: ET,
    entity: unknown
  ): entity is EntityWithMatchingId<ET, Entity> {
    return id === this.id && entity == this;
  }

  public matchesDomain<ET extends GetDomain<T>>(
    id: ET,
    entity: unknown
  ): entity is EntityWithMatchingId<`${ET}.${string}`, Entity> {
    return this.id.startsWith(id) && entity == this;
  }
}
