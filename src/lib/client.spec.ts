import { it, describe, expect, beforeAll, afterEach, afterAll } from "vitest";
import { RtmClient } from "./client";
import { RtmTypescriptError } from "./core/rtm-typescript-error";

import { server } from "../../test-support/msw-node";
import {
  MY_TEST_FROB,
  TEST_API_KEY,
  TEST_SHARED_SECRET,
} from "../../test-support/testing-values";
import { RtmApiFailedResponseError } from "./core/rtm-api-failed-response-error";
import { API_ERROR_CODES } from "../types/response-codes";

beforeAll(() => { server.listen(); });
afterEach(() => { server.resetHandlers(); });
afterAll(() => { server.close(); });

describe("RtmClient", () => {
  it("should correctly call an api method with a correct signature when I make a request", async () => {
    const rtmClient = new RtmClient(TEST_API_KEY, TEST_SHARED_SECRET, "delete");

    const response = await rtmClient.get("rtm.auth.getFrob", {});

    expect(response).toEqual({
      api_key: TEST_API_KEY,
      callback: "callback",
      frob: MY_TEST_FROB,
      stat: "ok",
    });
  });

  it("should correctly reject with an apiFailedResponseError if the response is a failure", async () => {
    const rtmClient = new RtmClient(
      TEST_API_KEY,
      "definitely-a-bad-secret",
      "delete",
    );

    await expect(rtmClient.get("rtm.auth.getFrob", {})).rejects.toThrow(
      new RtmApiFailedResponseError(
        API_ERROR_CODES.invalidSignature,
        "RTM api returned an error response: Invalid signature",
      ),
    );
  });

  it("should generate the correct authUrl with frob", () => {
    const rtmClient = new RtmClient(
      "your_api_key",
      "your_shared_secret",
      "delete",
    );

    const expectedAuthUrl =
      "https://www.rememberthemilk.com/services/auth?api_key=your_api_key&perms=delete&frob=my-frob&api_sig=89cc38f7da49bca7854f5e9dcd741434";

    const authUrl = rtmClient.getAuthUrl("my-frob");

    expect(authUrl).toBe(expectedAuthUrl);
  });

  it("should generate the correct authUrl without frob", () => {
    const rtmClient = new RtmClient(
      "your_api_key",
      "your_shared_secret",
      "delete",
    );

    const expectedAuthUrl =
      "https://www.rememberthemilk.com/services/auth?api_key=your_api_key&perms=delete&api_sig=f0b8891dc9b77dfa65aeff1b46bb240d";

    const authUrl = rtmClient.getAuthUrl();

    expect(authUrl).toBe(expectedAuthUrl);
  });

  it("constructor should throw an error if the key is empty", () => {
    expect(() => new RtmClient("", "your_shared_secret", "delete")).toThrow(
      new RtmTypescriptError("API key and secret must not be empty"),
    );
  });

  it("constructor should throw an error if the secret is empty", () => {
    expect(() => new RtmClient("your_api_key", "", "delete")).toThrow(
      new RtmTypescriptError("API key and secret must not be empty"),
    );
  });
});
