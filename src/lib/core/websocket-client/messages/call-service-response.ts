/**
 * @alpha
 */
export interface CallServiceResponse {
  context: {
    id: string;
    parent_id: null | string;
    user_id: string;
  };

  /**
   * Response data from the service action. Always present, but
   * will be `null` if the action does not support response data
   */
  response: null | Record<string, unknown>;
}
