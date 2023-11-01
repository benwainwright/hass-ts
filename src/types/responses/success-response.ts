import { ExpandRecursively } from "../expand-recursively";

export interface SuccessResponse<
  T extends Record<keyof T, { requestArgs: any; responseArgs: any }>,
  M extends keyof T,
> {
  rsp: ExpandRecursively<
    {
      stat: "ok";
      api_key?: string;
      callback: string;
    } & T[M]["responseArgs"]
  >;
}