export const normalisePath = (path: string) => {
  if (path.startsWith("/")) {
    return path;
  } else {
    return `/${path}`;
  }
};
