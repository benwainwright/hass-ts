import {
  Entities,
  Entity,
  EntityWithMatchingId,
  GetDomain,
  IdType,
} from "@entities";

export interface IEntityStore {
  get<T extends IdType>(id: T): EntityWithMatchingId<T, Entity>;
  get<E extends Record<keyof E, IdType>>(entities: E): Entities<E>;

  getFromDomain<ET extends GetDomain<IdType>>(
    domain: ET
  ): EntityWithMatchingId<`${ET}.${string}`, Entity>[];
}
