import { HTTP } from "@core";
import { Logger } from "@types";
import { normalisePath, safeJsonParse } from "@utils";
import { HassHttpError } from "@core/errors";

export class RestClient {
  private requestCache = new Map<string, { etag: string; text: string }>();
  private readonly path: string;
  public constructor(
    private readonly host: string,
    private readonly port: number,
    path: string,
    private readonly token: string,
    private readonly logger: Logger,
  ) {
    this.path = normalisePath(path);
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

  private async fetchRaw(
    path: string,
    method: "GET" | "POST",
    body?: Record<string, unknown>,
  ) {
    const finalUrl = `http://${this.host}:${this.port}${path}`;
    const cache = this.requestCache.get(finalUrl);

    const ifNoneMatchObj: Record<string, string> = cache
      ? { "if-none-match": cache.etag }
      : {};

    const response = await fetch(finalUrl, {
      body: JSON.stringify(body),
      method,
      headers: {
        authorization: `Bearer ${this.token}`,
        "content-type": "application/json",
        ...ifNoneMatchObj,
      },
    });

    if (response.status === HTTP.statusCodes.notModified && cache) {
      return { response, text: cache.text };
    }

    const etag = response.headers.get("etag");
    const text = await response.text();
    if (response.status === HTTP.statusCodes.ok && etag) {
      this.requestCache.set(finalUrl, { etag, text });
    }
    return { response, text };
  }

  private async request<R>(
    path: string,
    method: "GET" | "POST",
    body?: Record<string, unknown>,
  ): Promise<R> {
    const apiPath = `${this.path}${normalisePath(path)}`;

    const { response, text } = await this.fetchRaw(apiPath, method, body);

    this.logger.trace(
      `Request (http): ${method} ${apiPath} body: [${JSON.stringify(
        body,
      )}] response: (${response.status}) [${text}]`,
    );

    if (response.ok || response.status === HTTP.statusCodes.notModified) {
      return response.headers.get("content-type")?.includes("json")
        ? safeJsonParse<R>(text)
        : // TODO this is nasty. Should improve this.
          (text as R);
    }
    throw new HassHttpError(response.status, text);
  }
}
