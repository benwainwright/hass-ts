import { Context } from "./context";
import { State } from "./state";

export interface Event {
  data: {
    entity_id: string;
    new_state: State;
    old_state: State;
  };
  event_type: string;
  time_fired: string;
  origin: string;
  context: Context;
}
