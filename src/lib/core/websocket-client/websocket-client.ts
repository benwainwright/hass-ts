import WebSocket from "ws";
import { safeJsonParse } from "@utils";

import {
  ErrorResult,
  MessageFromServer,
  MessageToServer,
  Result,
} from "./messages/index.js";

import { HassTsError, ErrorResponseError } from "@core/errors";

import { Logger } from "@types";
import { ERRORS } from "@core/constants";

export class WebsocketClient {
  private socket: WebSocket;
  private connected = false;
  private messageCallbacks: ((message: MessageFromServer) => void)[] = [];
  private authCompleteCallbacks: [success: () => void, failure: () => void][] =
    [];
  private responseCallbacks = new Map<
    number,
    (message: Result<unknown> | ErrorResult) => void
  >();
  private id: number = 1;

  public constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly token: string,
    private readonly logger: Logger
  ) {
    if (token === "") {
      throw new HassTsError(ERRORS.tokenCannotBeAnEmptyString);
    }
    if (host === "") {
      throw new HassTsError(ERRORS.hostCannotBeAnEmptyString);
    }
    if (port < 0) {
      throw new HassTsError(ERRORS.portCannotBeNegative);
    }

    this.socket = new WebSocket(`ws://${host}:${port}/api/websocket`);
  }

  public async init(): Promise<void> {
    this.socket.on("open", () => {
      this.socket.on("message", (data: Buffer) => {
        const message = safeJsonParse<MessageFromServer>(
          data.toString("utf-8")
        );
        this.logger.trace(`Received (ws): ${JSON.stringify(message)}`);
        this.handleMessage(message);
      });
    });
    await this.waitTillAuthFinished();
  }

  public async close(): Promise<void> {
    if (this.connected) {
      await this.waitTillAuthFinished();
      this.socket.close();
    }
  }

  public async sendCommand<T extends MessageToServer, R>(
    command: Omit<T, "id">
  ): Promise<Result<R>> {
    if (!this.connected) {
      throw new HassTsError(ERRORS.notInitialised);
    }
    const id = this.id;
    this.sendToSocket({ ...command, id });
    this.id++;
    return await this.waitForAndReturnResponse<R>(id);
  }

  public addMessageListener(listener: (message: MessageFromServer) => void) {
    if (!this.connected) {
      throw new HassTsError(ERRORS.notInitialised);
    }
    this.messageCallbacks.push(listener);
  }

  public removeMessageListener(listener: (message: MessageFromServer) => void) {
    if (!this.connected) {
      throw new HassTsError(ERRORS.notInitialised);
    }
    const registeredCallback = this.messageCallbacks.find(
      (callback) => callback === listener
    );
    if (!registeredCallback) {
      throw new HassTsError(ERRORS.callbackNotRegistered);
    }
    this.messageCallbacks = this.messageCallbacks.filter(
      (callback) => callback !== listener
    );
  }

  private async waitTillAuthFinished() {
    await new Promise<void>((accept, reject) => {
      if (!this.connected) {
        this.onAuthComplete(accept, () => {
          reject(new HassTsError(ERRORS.authenticationFailed));
        });
      } else {
        accept();
      }
    });
  }

  private async waitForAndReturnResponse<R>(id: number): Promise<Result<R>> {
    return await new Promise<Result<R>>((accept, reject) => {
      this.responseCallbacks.set(
        id,
        (response: Result<unknown> | ErrorResult) => {
          this.responseCallbacks.delete(id);
          if (response.success) {
            accept(response as Result<R>);
          } else {
            reject(
              new ErrorResponseError(
                response.error.code,
                response.error.message
              )
            );
          }
        }
      );
    });
  }

  private sendToSocket<T extends Record<string, unknown>>(message: T) {
    this.logger.trace(`Sent (ws): ${JSON.stringify(message)}`);
    this.socket.send(JSON.stringify(message));
  }

  private onAuthComplete(accept: () => void, reject: () => void) {
    this.authCompleteCallbacks.push([accept, reject]);
  }

  private handleAuthOk() {
    this.connected = true;
    this.authCompleteCallbacks.forEach(([successCallback]) => {
      successCallback();
    });
    this.authCompleteCallbacks = [];
  }

  private handleAuthInvalid() {
    this.authCompleteCallbacks.forEach(([, failureCallback]) => {
      failureCallback();
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

  private handleOtherMessages(message: MessageFromServer) {
    this.messageCallbacks.forEach((callback) => {
      callback(message);
    });
  }

  private handleMessage(message: MessageFromServer) {
    switch (message.type) {
      case "auth_required":
        this.handleAuthRequired();
        break;
      case "auth_ok":
        this.handleAuthOk();
        break;
      case "auth_invalid":
        this.handleAuthInvalid();
        break;
      case "result":
        this.handleResult(message);
        break;
      default:
        this.handleOtherMessages(message);
    }
  }
}
