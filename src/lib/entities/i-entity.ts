import { Entity, EntityWithMatchingId, IdType } from "./entities.js";

export interface IEntity<T extends IdType> {
  readonly id: T;

  matchesId<ET extends T>(
    id: ET,
    entity: unknown
  ): entity is EntityWithMatchingId<ET, Entity>;

  matchesDomain<ET extends T>(
    id: ET,
    entity: unknown
  ): entity is EntityWithMatchingId<ET, Entity>;
}
