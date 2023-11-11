import WebSocket from "ws";
import { MessageFromServer } from "./messages";
import { safeJsonParse } from "@utils";
import { MessageToServer } from "./messages/message-to-server";
import { Result } from "./messages/result";

export class WebsocketClient {
  private socket: WebSocket;
  private authed = false;
  private authCompleteCallbacks: (() => void)[] = [];
  private responseCallbacks = new Map<number, (message: unknown) => void>();
  private id: number = 1;

  public constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly token: string,
  ) {
    this.socket = new WebSocket(`ws://${host}:${port}`);

    this.socket.on("open", () => {
      this.socket.on("message", (data) => {
        if (data instanceof Buffer) {
          const message = safeJsonParse<MessageFromServer>(
            data.toString("utf-8"),
          );
          this.handleMessage(message);
        }
      });
    });
  }

  private sendToSocket<T extends Record<string, unknown>>(message: T) {
    this.socket.send(JSON.stringify(message));
  }

  public async sendCommand<T extends Omit<MessageToServer, "id">, R>(
    command: T,
  ): Promise<R> {
    await new Promise<void>((accept) => {
      if (!this.authed) {
        this.onAuthComplete(accept);
      }
    });

    const id = this.id;
    this.sendToSocket({ ...command, id });
    this.id++;
    return await new Promise<R>((accept) => {
      this.responseCallbacks.set(id, (response: unknown) => {
        accept(response as R);
      });
    });
  }

  private onAuthComplete(callback: () => void) {
    this.authCompleteCallbacks.push(callback);
  }

  private handleAuthOk() {
    this.authed = true;
    this.authCompleteCallbacks.forEach((callback) => {
      callback();
    });
    this.authCompleteCallbacks = [];
  }

  private handleAuthRequired() {
    this.socket.send(
      JSON.stringify({
        type: "auth",
        access_token: this.token,
      }),
    );
  }

  private handleResult(message: Result<unknown>) {
    const callback = this.responseCallbacks.get(message.id);
    callback?.(message.result);
  }

  private handleMessage(message: MessageFromServer) {
    switch (message.type) {
      case "auth_required":
        this.handleAuthRequired();
        break;
      case "auth_ok":
        this.handleAuthOk();
        break;
      case "result":
        this.handleResult(message);
    }
  }
}
