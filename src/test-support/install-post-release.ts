import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getPackageName } from "./get-package-name.js";

export const setup = async () => {
  const packageName = getPackageName();
  const execCommand = promisify(exec);
  await execCommand(`npm install ${packageName}@latest`);
};
