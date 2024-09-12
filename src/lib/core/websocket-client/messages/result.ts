export interface Result<T> {
  id: number;
  type: "result";
  success: true;
  result: T;
}
