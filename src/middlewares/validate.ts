import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../common/utils/base-error";

export const validateMiddleware =
  <T>(
    classValidate: ClassConstructor<T>,
    options?: {
      isQuery?: boolean;
      skipMissingProperties?: boolean;
      paramsField?: string;
    }
  ) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const isQuery = options?.isQuery ?? false;
    const shouldSkipMissingProperties = options?.skipMissingProperties ?? false;
    // check body, query field
    const request = isQuery ? req.query : req.body;

    // check params field
    if (options?.paramsField) {
      request[options.paramsField] = req.params[options.paramsField];
    }
    const dataValidate = plainToInstance<T, Response>(classValidate, request);
    console.log("---dataValidate", dataValidate);

    const errors = await validate(dataValidate, {
      skipMissingProperties: shouldSkipMissingProperties,
    });

    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => {
        const mapError =
          error.constraints &&
          Object.values(error.constraints).map((error_) => {
            return error_;
          });
        return mapError;
      });
      next(new BadRequestError(message.join(" , ")));
    } else {
      req[isQuery ? "query" : "body"] = dataValidate;
      if (options?.paramsField) {
        req.params[options?.paramsField] = (dataValidate as any)[
          options?.paramsField
        ];
      }
      next();
    }
  };
