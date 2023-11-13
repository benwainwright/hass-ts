export interface Event {
  data: Data;
  event_type: string;
  time_fired: string;
  origin: string;
  context: Context;
}

export interface Context {
  id: string;
  parent_id: null;
  user_id: string;
}

export interface Data {
  entity_id: string;
  new_state: NewState;
  old_state: OldState;
}

export interface NewState {
  entity_id: string;
  last_changed: string;
  state: string;
  attributes: NewStateAttributes;
  last_updated: string;
  context: Context;
}

export interface NewStateAttributes {
  rgb_color: number[];
  color_temp: number;
  supported_features: number;
  xy_color: number[];
  brightness: number;
  white_value: number;
  friendly_name: string;
}

export interface OldState {
  entity_id: string;
  last_changed: string;
  state: string;
  attributes: OldStateAttributes;
  last_updated: string;
  context: Context;
}

export interface OldStateAttributes {
  supported_features: number;
  friendly_name: string;
}
