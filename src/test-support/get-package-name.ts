import { readFileSync } from "node:fs";

export const getPackageName = () => {
  return (
    JSON.parse(readFileSync("./package.json", "utf8")) as Record<string, string>
  )["name"];
};
