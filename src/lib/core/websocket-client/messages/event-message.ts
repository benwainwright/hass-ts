import { Event } from "@types";
export interface EventMessage {
  id: number;
  type: "event";
  event: Event;
}
