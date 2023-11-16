import { Entity, EntityWithMatchingId, GetDomain, IdType } from "./entities.js";

export abstract class BaseEntity<T extends IdType> {
  public abstract readonly id: T;

  public matchesId<ET extends T>(
    id: ET,
    entity: unknown
  ): entity is EntityWithMatchingId<ET, Entity> {
    return id === this.id;
  }

  public matchesDomain<ET extends GetDomain<T>>(
    id: ET,
    entity: unknown
  ): entity is EntityWithMatchingId<`${ET}.${string}`, Entity> {
    return id.startsWith(this.id);
  }
}
