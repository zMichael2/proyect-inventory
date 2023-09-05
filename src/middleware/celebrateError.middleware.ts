import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";

export const celebrateError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isCelebrateError(err)) {
    const [errorDetail] = err.details.get("body")!.details;
    return res.status(400).json({
      ok: false,
      message: errorDetail.message,
    });
  }

  return next(err);
};
