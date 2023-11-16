import {
  Entity,
  IdType,
  EntityWithMatchingId,
  BaseEntity,
  GetDomain,
} from "@entities";

export class Hass {
  public entities = new Map<IdType, BaseEntity<IdType>>();

  constructor(entities: BaseEntity<IdType>[]) {
    entities.forEach((entity) => {
      this.entities.set(entity.id, entity);
    });
  }

  getEntitiesForDomain<ET extends GetDomain<IdType>>(domain: ET) {
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
