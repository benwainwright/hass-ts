/**
 * @alpha
 */
export type Services = { [key: string]: { [key: string]: Service } };

/**
 * @alpha
 */
export interface Service {
  name: string;
  description: string;
  fields: Record<string, unknown>;
  target?: { entity: Record<string, unknown>[] };
}
