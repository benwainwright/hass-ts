import {
  Entity,
  IdType,
  Entities,
  EntityWithMatchingId,
  BaseEntity,
  GetDomain,
} from "@entities";
import { isKeyOf } from "@utils";

export class Hass {
  public entities = new Map<IdType, BaseEntity<IdType>>();

  constructor(entities: BaseEntity<IdType>[]) {
    entities.forEach((entity) => {
      this.entities.set(entity.id, entity);
    });
  }

  getEntity<T extends IdType>(id: T): EntityWithMatchingId<T, Entity> {
    const entity = this.entities.get(id);
    if (entity?.matchesId(id, entity)) {
      return entity;
    }
    throw new Error(`No entity found with id ${id}`);
  }

  getEntities<E extends Record<keyof E, IdType>>(entities: E): Entities<E> {
    let result: Partial<Entities<E>> = {};

    for (const [key] of Object.entries(entities)) {
      const keyAs = key as keyof E;
      const val = entities[keyAs];
      result[keyAs] = this.getEntity(val);
    }
    return result as Entities<E>;
  }

  getDomainEntities<ET extends GetDomain<IdType>>(domain: ET) {
    const domainEntities: EntityWithMatchingId<`${ET}.${string}`, Entity>[] =
      [];

    for (const entity of this.entities.values()) {
      if (entity.matchesDomain(domain, entity)) {
        domainEntities.push(entity);
      }
    }

    return domainEntities;
  }
}
