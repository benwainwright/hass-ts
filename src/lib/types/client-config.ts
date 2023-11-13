import { Logger } from "@types";

export interface HassClientConfig {
  host: string;
  port: number;
  token: string;
  logger?: Logger;
}
