export type Services = { [key: string]: Domain };

type Domain = { [key: string]: Service };

interface Service {
  name: string;
  description: string;
  fields: Record<string, unknown>;
  target?: { entity: Record<string, unknown>[] };
}
