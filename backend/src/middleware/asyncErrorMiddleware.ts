import { NextFunction, Request, Response } from "express";

type HandledFunc = (
  arg1: Request,
  arg2: Response
) => Promise<Response<any, Record<string, any>> | void>;

export const asyncErrorMiddleware = (asyncFuncToBeHandled: HandledFunc) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFuncToBeHandled(req, res);
    } catch (error) {
      next(error);
    }
  };
};
