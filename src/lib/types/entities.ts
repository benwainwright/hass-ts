import { Entity } from "../entities/entity.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetIdTypes<T extends abstract new (...args: any[]) => unknown> =
  T extends unknown ? ConstructorParameters<T>[0] : never;

export type IdType = GetIdTypes<Entity>;

export type GetDomain<T extends IdType> = T extends `${infer Domain}.${string}`
  ? Domain
  : never;



type EntityType<T extends IdType> = EntityWithMatchingId<T, Entity>;

