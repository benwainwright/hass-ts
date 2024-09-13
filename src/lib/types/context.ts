/**
 * @public
 *
 * Used to tie events and states together. See {@link https://data.home-assistant.io/docs/context/}
 */
export interface Context {
  /**
   * Unique identifier for the context
   */
  id: string;

  /**
   * Unique identifier for the user that started the change
   */
  parent_id: null;

  /**
   * Unique identifier of the parent context_id that started the change.
   */
  user_id: string;
}
