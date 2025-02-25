
import { BAD_REQUEST, CONFLICT, FORBIDDEN, HttpStatusCode, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from '../constants';


class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: number;

  constructor(name: string, httpCode: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

class APIError extends BaseError {
  constructor(name: string, httpCode = HttpStatusCode.INTERNAL_SERVER, description = INTERNAL_SERVER_ERROR) {
    super(name, httpCode, description);
  }
}

class NotFoundError extends BaseError {
  constructor(name: string, description = NOT_FOUND) {
    super(name, HttpStatusCode.NOT_FOUND, description);
  }
}

class BadRequestError extends BaseError {
  constructor(name: string, description = BAD_REQUEST) {
    super(name, HttpStatusCode.BAD_REQUEST, description);
  }
}

class UnauthorizedError extends BaseError {
  constructor(name: string, description = UNAUTHORIZED) {
    super(name, HttpStatusCode.UNAUTHORIZED, description);
  }
}

class ConflictError extends BaseError {
  constructor(name: string, description = CONFLICT) {
    super(name, HttpStatusCode.CONFLICT, description);
  }
}

class ForbiddenError extends BaseError {
  constructor(name: string, description = FORBIDDEN) {
    super(name, HttpStatusCode.FORBIDDEN, description);
  }
}

export { APIError, BadRequestError, BaseError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError };
