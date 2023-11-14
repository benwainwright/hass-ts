import { HttpResponse, http } from "msw";

import { TEST_HASS_HOST, TEST_HASS_PORT } from "..";
import { validateCredentials } from "./validate-credentials";
import { HTTP } from "@core";

export const handlers = [
  http.get(
    `http://${TEST_HASS_HOST}:${TEST_HASS_PORT}/api/test`,
    ({ request }): HttpResponse => {
      const errorResponse = validateCredentials(request);
      if (errorResponse) {
        return errorResponse;
      }

      return HttpResponse.json(
        { result: "ok" },
        { status: HTTP.statusCodes.ok },
      );
    },
  ),

  http.get(
    `http://${TEST_HASS_HOST}:${TEST_HASS_PORT}/api/text`,
    ({ request }): HttpResponse => {
      const errorResponse = validateCredentials(request);
      if (errorResponse) {
        return errorResponse;
      }

      return HttpResponse.text("some text", { status: HTTP.statusCodes.ok });
    },
  ),

  http.post(
    `http://${TEST_HASS_HOST}:${TEST_HASS_PORT}/api/test`,
    async ({ request }): Promise<HttpResponse> => {
      const errorResponse = validateCredentials(request);
      if (errorResponse) {
        return errorResponse;
      }

      const body = await request.json();

      if (typeof body !== "object" || !body?.testArg) {
        return HttpResponse.json(
          { result: "badRequest" },
          { status: HTTP.statusCodes.badRequest },
        );
      }

      return HttpResponse.json(
        { result: "ok" },
        { status: HTTP.statusCodes.ok },
      );
    },
  ),
];
