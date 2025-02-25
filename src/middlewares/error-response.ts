import { NextFunction, Request, Response } from "express";

import {
  APIError,
  BadRequestError,
  BaseError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../common/utils/base-error";
import { HttpStatusCode, INTERNAL_SERVER_ERROR } from "../common/constants";

type TErrorResponse =
  | APIError
  | BaseError
  | NotFoundError
  | BadRequestError
  | UnauthorizedError
  | ForbiddenError;

export default function errorResponse(
  error: TErrorResponse,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (error instanceof BaseError === true) {
      res.status(error.httpCode).json({
        name: error.name,
        message: error.message,
        error: error.message,
        code: error.httpCode,
        stack: undefined,
      });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER).json({
        name: (error as Error).name,
        message: INTERNAL_SERVER_ERROR,
        error: INTERNAL_SERVER_ERROR,
        code: HttpStatusCode.INTERNAL_SERVER,
        stack: undefined,
      });
    }
  } catch (error) {
    next(error);
  }
}
