export const isKeyOf = <T extends Record<string, unknown>>(
  thing: T,
  key: unknown,
): key is keyof T => {
  return Object.keys(thing).includes(key as string);
};
