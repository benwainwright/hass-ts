import { Context } from "./context.js";

/**
 * @public
 */
export interface State {
  /**
   * Home assistant entity id string in the format <domain>.<id>
   */
  entity_id: string;

  /**
   * When was the entity last changed (ISO timestamp)
   */
  last_changed: string;

  /**
   * When did the entity last report its state (ISO timestamp)
   */
  last_reported: string;

  /**
   * Current state of the entity
   */
  state: string;

  /**
   * State attributes (Specific to different entity domains)
   */
  attributes: Record<string, unknown>;

  /**
   * When was the entity last updated (ISO timestamp)
   */
  last_updated: string;

  /**
   * The context associated with this state change
   */
  context: Context;
}
