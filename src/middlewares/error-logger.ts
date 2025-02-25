import { Request, Response, NextFunction } from "express";
import { logger } from "../common/configs/logger";


const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
  });

  next(err);
};

export default errorLogger;
