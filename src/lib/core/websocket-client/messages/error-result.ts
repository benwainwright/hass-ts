export interface ErrorResult {
  id: number;
  type: "result";
  success: false;
  error: {
    code: string;
    message: string;
  };
}
