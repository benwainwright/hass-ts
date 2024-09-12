import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getPackageName } from "./get-package-name.js";
import { v2 as compose } from "docker-compose";
import path from "node:path";
import { delay } from "./delay.js";

export const setup = async () => {
  if (process.env.POST_RELEASE === "true") {
    const packageName = getPackageName();
    const execCommand = promisify(exec);
    await execCommand(`npm install ${packageName}@latest`);
  }

  console.log(" ℹ️  Starting test HASS server...");

  await compose.upAll({
    cwd: path.join(__dirname),
    commandOptions: ["--build"],
    callback: (chunk) => {
      console.log(`Job in progress: `, chunk.toString());
    },
  });

  void compose.logs("homeassistant", {
    follow: true,
    callback: (chunk) => {
      console.log(chunk.toString());
    },
  });

  await delay(3000);
};

export const teardown = async () => {
  console.log(" ℹ️  Stopping test HASS server...");
  await compose.down({
    cwd: path.join(__dirname),
  });
};
