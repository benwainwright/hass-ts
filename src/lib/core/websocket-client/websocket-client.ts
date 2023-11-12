import WebSocket from "ws";
import { safeJsonParse } from "@utils";

import { MessageFromServer } from "./messages";
import { MessageToServer } from "./messages/message-to-server";
import { Result } from "./messages/result";
import { ErrorResult } from "./messages/error-result";
import { HassTsError } from "../errors/hass-ts-error";

export class WebsocketClient {
  private socket: WebSocket;
  private authed = false;
  private authCompleteCallbacks: (() => void)[] = [];
  private responseCallbacks = new Map<
    number,
    (message: Result<unknown> | ErrorResult) => void
  >();
  private id: number = 1;

  public constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly token: string,
  ) {
    this.socket = new WebSocket(`ws://${host}:${port}`);
  }

  public async init(): Promise<void> {
    this.socket.on("open", () => {
      this.socket.on("message", (data: Buffer) => {
        const message = safeJsonParse<MessageFromServer>(
          data.toString("utf-8"),
        );
        this.handleMessage(message);
      });
    });
    await this.waitTillAuthFinished();
  }

  public async close(): Promise<void> {
    await this.waitTillAuthFinished();
    this.socket.close();
  }

  public async sendCommand<T extends Omit<MessageToServer, "id">, R>(
    command: T,
  ): Promise<R> {
    await this.waitTillAuthFinished();
    const id = this.id;
    this.sendToSocket({ ...command, id });
    this.id++;
    return await this.waitForAndReturnResponse<R>(id);
  }

  private async waitTillAuthFinished() {
    await new Promise<void>((accept) => {
      if (!this.authed) {
        this.onAuthComplete(accept);
      } else {
        accept();
      }
    });
  }

  private async waitForAndReturnResponse<R>(id: number): Promise<R> {
    return await new Promise<R>((accept, reject) => {
      this.responseCallbacks.set(
        id,
        (response: Result<unknown> | ErrorResult) => {
          this.responseCallbacks.delete(id);
          if (response.success) {
            accept(response.result as R);
          } else {
            reject(
              new HassTsError(response.error.code, response.error.message),
            );
          }
        },
      );
    });
  }

  private sendToSocket<T extends Record<string, unknown>>(message: T) {
    this.socket.send(JSON.stringify(message));
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
    this.sendToSocket({
      type: "auth",
      access_token: this.token,
    });
  }

  private handleResult(message: Result<unknown> | ErrorResult) {
    const callback = this.responseCallbacks.get(message.id);
    callback?.(message);
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
