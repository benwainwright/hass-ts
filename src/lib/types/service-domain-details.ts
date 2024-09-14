import { Service } from "./services.js";

/**
 * @alpha
 */
export interface ServiceDomainDetails {
  domain: string;
  services: Record<string, Service>;
}
