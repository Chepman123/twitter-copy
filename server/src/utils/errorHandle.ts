import { Request, Response, NextFunction } from "express";

export default function errorHandle(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("[ERROR]", err);

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ success: false, message });
}
