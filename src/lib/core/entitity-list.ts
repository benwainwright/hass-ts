import { Climate } from "../entities/climate.js";
import { IdType } from "../types/entities.js";

const entities = [Climate] as const;

const makeEnitity = <T extends IdType>(id: T) => {};
