import { RtmClient } from "../client";
import { NameSpace } from "../../types/api-methods";

/**
 * @public
 */
export interface GetTokenArgs {
  /**
   * Frob argument previously returned via a
   * call to rtm.auth.getFrob
   */
  frob: string;
}

/**
 * @public
 */
export class Auth implements NameSpace<"auth"> {
  constructor(private client: RtmClient) {}

  /**
   *
   * Returns a frob for use during authentication
   *
   * @see {@link https://www.rememberthemilk.com/services/api/methods/rtm.auth.getFrob.rtm|RTM Api Documentation} for more information
   *
   * @returns Remember the milk API response
   * @throws {@link RtmApiFailedResponseError} if the API responds with a failure
   * @throws {@link RtmHttpError} if the API responds with a non 200 response
   */
  async getFrob() {
    return await this.client.get("rtm.auth.getFrob", {});
  }

  /**
   * Returns the auth token for the given frob, if one has been attached.
   *
   * @see {@link https://www.rememberthemilk.com/services/api/methods/rtm.auth.getToken.rtm|RTM Api Documentation} for more information
   *
   * @returns Remember the milk API response
   * @throws {@link RtmApiFailedResponseError} if the API responds with a failure
   * @throws {@link RtmHttpError} if the API responds with a non 200 response
   */
  async getToken(params: GetTokenArgs) {
    return await this.client.get("rtm.auth.getToken", params);
  }
}
