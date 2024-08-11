import { EntityType, GetDomain, IdType } from "@entities";

export const matchesDomain = <T extends IdType, ET extends GetDomain<T>>(
  entity: unknown,
  entityId: T,
  testDomain: ET
): entity is EntityType<`${ET}.${string}`> => {
  return entityId.startsWith(testDomain);
};
