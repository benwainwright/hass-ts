export interface Socket {
  send: (data: string) => void;
  close: () => void;
  on: (event: "close", callback: () => void) => void;
  terminate: () => void;
}
