import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const mainErrorHandlerMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).send("Something failed, please try again later!");
};
