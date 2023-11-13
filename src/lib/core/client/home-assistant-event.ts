export interface HomeAssistantEvent {
  eventType: string;
  data: {
    [key: string]: unknown;
  };
}
