import { Response } from "express";

// Utility type to enforce correct response types
export function typedResponse<T>(
  res: Response,
  status: number,
  data: T
): Response<T> {
  return res.status(status).json(data);
}
