import { Logger } from "@types";
import { safeJsonParse } from "@utils";
import { HassHttpError } from "../errors";

export class RestClient {
  public constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly token: string,
    private readonly logger: Logger,
  ) {}

  private normalisePath(path: string) {
    if (path.startsWith("/")) {
      return path;
    } else {
      return `/${path}`;
    }
  }

  private async request<T>(
    path: string,
    method: "GET" | "POST",
    body?: Record<string, unknown>,
  ) {
    const apiPath = `/api${this.normalisePath(path)}`;

    const response = await fetch(`http://${this.host}:${this.port}${apiPath}`, {
      body: JSON.stringify(body),
      method,
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
      },
    });
    const text = await response.text();

    if (response.ok) {
      this.logger.trace(
        `Request (http): ${method} ${apiPath} body: [${JSON.stringify(
          body,
        )}] response: (${response.status}) [${text}]`,
      );
      return safeJsonParse<T>(text);
    }
    throw new HassHttpError(response.status, text);
  }

  public async get<R>(path: string): Promise<R> {
    return await this.request<R>(path, "GET");
  }

  public async post<B extends Record<string, unknown>, R>(
    path: string,
    body: B,
  ): Promise<R> {
    return await this.request<R>(path, "POST", body);
  }
}
