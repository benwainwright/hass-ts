import {
  Entity,
  IdType,
  Entities,
  EntityWithMatchingId,
  BaseEntity,
  GetDomain,
} from "@entities";

import { IEntityStore } from "./i-entity-store.js";

export class EntityStore implements IEntityStore {
  public entities = new Map<IdType, BaseEntity<IdType>>();

  constructor(entities: BaseEntity<IdType>[]) {
    entities.forEach((entity) => {
      this.entities.set(entity.id, entity);
    });
  }

  public get<T extends IdType>(id: T): EntityWithMatchingId<T, Entity>;
  public get<E extends Record<keyof E, IdType>>(entities: E): Entities<E>;
  public get<T extends IdType, E extends Record<keyof E, IdType>>(
    idOrObj: T | E
  ): EntityWithMatchingId<T, Entity> | Entities<E> {
    if (typeof idOrObj === "string") {
      return this.getEntity(idOrObj);
    }
    return this.getEntities(idOrObj);
  }

  private getEntity<T extends IdType>(id: T): EntityWithMatchingId<T, Entity> {
    const entity = this.entities.get(id);

    if (entity?.matchesId(id, entity)) {
      return entity;
    }
    throw new Error(`No entity found with id ${id}`);
  }

  private getEntities<E extends Record<keyof E, IdType>>(
    entities: E
  ): Entities<E> {
    let result: Partial<Entities<E>> = {};

    for (const [key] of Object.entries(entities)) {
      const keyAs = key as keyof E;
      const val = entities[keyAs];
      result[keyAs] = this.getEntity(val);
    }
    return result as Entities<E>;
  }

  public getFromDomain<ET extends GetDomain<IdType>>(domain: ET) {
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
