import { HttpResponse, http } from "msw";
import { getFrob } from "./method-handlers/auth/get-frob";
import { validateRequest } from "./validate-request";
import { REST_API_URL, HTTP } from "../src/lib/constants";
import { makeFailureResponse } from "./make-failure-response";
import { API_ERROR_CODES } from "../src/types/response-codes";

export const handlers = [
  http.get(REST_API_URL, ({ request }) => {
    const paramsOrResponse = validateRequest(request);

    if (!("key" in paramsOrResponse)) {
      return paramsOrResponse;
    }

    const { key, method } = paramsOrResponse;

    switch (method) {
      case "rtm.auth.getFrob":
        return getFrob(request, key);
    }

    return HttpResponse.json(
      makeFailureResponse(
        API_ERROR_CODES.notFound,
        `Method "${method}" not found`,
      ),
      {
        // @ts-expect-error incorrect types in msw
        status: HTTP.statusCodes.Ok,
      },
    );
  }),
];
