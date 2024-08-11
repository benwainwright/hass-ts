import { Client } from "@core";
import { IdType } from "@entities";

export abstract class BaseEntity<T extends IdType> {
  public readonly id: T;

  protected constructor(
    id: string,
    domain: string,
    protected readonly client: Client
  ) {
    if (!this.idMatchesDomain(id, domain)) {
      throw new Error(`Invalid id for ${this.constructor.name}: ${id}`);
    }
    this.id = id;
  }

  public idMatchesDomain(id: string, domain: string): id is T {
    return id.startsWith(domain);
  }
}
