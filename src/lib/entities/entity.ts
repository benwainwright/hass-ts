import { Climate } from "./climate.js";
import { Light } from "./light.js";

export type Entity =
  | typeof Light<`light.${string}`>
  | typeof Climate<`climate.${string}`>;
