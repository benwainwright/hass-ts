export interface TriggerEventMessage<T = unknown> {
  id: number;
  type: "event";
  event: {
    variables: {
      trigger: T;
    };
  };
}
