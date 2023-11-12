export interface Socket {
  send: (data: string) => void;
  close: () => void;
}
