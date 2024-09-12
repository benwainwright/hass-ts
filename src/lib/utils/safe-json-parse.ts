export const safeJsonParse = <T = never>(json: string) => {
  return JSON.parse(json) as T;
};
