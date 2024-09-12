export const convertCamelCaseToUnderscoreCase = (text: string) => {
  return text
    .match(/([A-Z]{1}[a-z]*|^[a-z]*)/g)
    ?.map((word) => word.toLowerCase())
    .join("_");
};
