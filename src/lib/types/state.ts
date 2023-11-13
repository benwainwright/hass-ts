import { Context } from "./context";

export interface State {
  entity_id: string;
  last_changed: string;
  state: string;
  attributes: Record<string, unknown>;
  last_updated: string;
  context: Context;
}
