import { Request, Response, NextFunction } from "express";

export const appendApiVersion = (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader("X-API-Version", "1.0.0");

  next();
}