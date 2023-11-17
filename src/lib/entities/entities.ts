import { Entity } from "./entity.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetIdTypes<T extends abstract new (...args: any[]) => unknown> =
  T extends unknown ? ConstructorParameters<T>[0] : never;

export type IdType = GetIdTypes<Entity>;

export type GetDomain<T extends IdType> = T extends `${infer Domain}.${string}`
  ? Domain
  : never;

export type MatchesId<
  T extends IdType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Y extends abstract new (args: any) => unknown,
> = T extends ConstructorParameters<Y>[0] ? Y : never;

export type EntityWithMatchingId<
  T extends IdType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Y extends new (...id: any[]) => any,
> = Y extends MatchesId<T, Y> ? InstanceType<Y> : never;

type EntityType<T extends IdType> = EntityWithMatchingId<T, Entity>;

export type Entities<T extends Record<keyof T, IdType>> = {
  [K in keyof T]: EntityType<T[K]>;
};
