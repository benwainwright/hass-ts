import { IdType, GetDomain, EntityList, Entities, EntityType } from "@entities";

import { BaseEntity } from "@core";
import { matchesId } from "./matches-id.js";
import { matchesDomain } from "./matches-domain.js";
import { IEntityStore } from "./i-entity-store.js";

export class EntityStore {
  public entities = new Map<IdType, BaseEntity<IdType>>();

  constructor(entities: BaseEntity<IdType>[]) {
    entities.forEach((entity) => {
      this.entities.set(entity.id, entity);
    });
  }

  public get<T extends IdType>(id: T): EntityType<T>;
  public get<E extends Record<keyof E, IdType>>(entities: E): Entities<E>;
  public get<T extends IdType, E extends Record<keyof E, IdType>>(
    idOrObj: T | E
  ): EntityType<T> | Entities<E> {
    if (typeof idOrObj === "string") {
      return this.getEntity(idOrObj);
    }
    return this.getEntities(idOrObj);
  }

  private getEntity<T extends IdType>(id: T): EntityType<T> {
    const entity = this.entities.get(id);

    if (entity && matchesId(entity, entity.id, id)) {
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
    const domainEntities: EntityType<`${ET}.${string}`>[] = [];

    for (const entity of this.entities.values()) {
      if (matchesDomain(entity, entity.id, domain)) {
        domainEntities.push(entity);
      }
    }

    return domainEntities;
  }
}

const store = new EntityStore([]);

const foo = store.get("light.bar");
