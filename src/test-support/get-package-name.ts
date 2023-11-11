import { readFileSync } from "fs";

export const getPackageName = () => {
  const contents = readFileSync("./package.json", "utf8");
  return (
    JSON.parse(contents) as Record<string, string>
  )["name"];
};
