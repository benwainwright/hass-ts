/**
 * @alpha
 */
export interface Service {
  name: string;
  description: string;
  fields: Record<string, unknown>;
  target?: { entity: Record<string, unknown>[] };
  Response: unknown;
}
