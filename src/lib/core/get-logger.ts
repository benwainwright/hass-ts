import { Logger } from "@types";

const defaultLogger: Logger = {
  trace: () => {},

  debug: () => {},

  info: (message: string) => {
    console.log(message);
  },

  warn: (message: string) => {
    console.log(message);
  },

  error: (message: string) => {
    console.log(message);
  },

  fatal: (message: string) => {
    console.log(message);
  },
};

export const getLogger = (logger?: Logger) => {
  return logger ?? defaultLogger;
};
