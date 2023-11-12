export interface EventMessage<T> {
  id: number;
  type: "event";
  event: T;
}
