import * as entities from "./entities.js";
import { BaseEntity, Client } from "@core";

const entityList = Object.entries(entities).map(([, entity]) => entity);

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type EntityList = InstanceType<(typeof entityList)[number]>;

export type IdType = EntityList["id"];

export type ExcludeWithId<
  T extends IdType,
  L extends EntityList,
> = L extends BaseEntity<`${GetDomain<T>}.${string}`> ? L : never;

export type GetDomain<T extends IdType> = T extends `${infer Domain}.${string}`
  ? Domain
  : never;

export const makeEntity = <T extends IdType>(entity: T, client: Client) => {
  return entityList.find((entityConstructor) => {
    try {
      return entityConstructor.make(entity, client);
    } catch {
      return false;
    }
  });
};

export type Entities<T extends Record<keyof T, IdType>> = {
  [K in keyof T]: EntityType<T[K]>;
};

export type EntityType<T extends IdType> = ExcludeWithId<T, EntityList>;

export default entities;
