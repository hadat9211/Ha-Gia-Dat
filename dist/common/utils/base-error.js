"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.ForbiddenError = exports.ConflictError = exports.BaseError = exports.BadRequestError = exports.APIError = void 0;
const constants_1 = require("../constants");
class BaseError extends Error {
    constructor(name, httpCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
class APIError extends BaseError {
    constructor(name, httpCode = constants_1.HttpStatusCode.INTERNAL_SERVER, description = constants_1.INTERNAL_SERVER_ERROR) {
        super(name, httpCode, description);
    }
}
exports.APIError = APIError;
class NotFoundError extends BaseError {
    constructor(name, description = constants_1.NOT_FOUND) {
        super(name, constants_1.HttpStatusCode.NOT_FOUND, description);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends BaseError {
    constructor(name, description = constants_1.BAD_REQUEST) {
        super(name, constants_1.HttpStatusCode.BAD_REQUEST, description);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends BaseError {
    constructor(name, description = constants_1.UNAUTHORIZED) {
        super(name, constants_1.HttpStatusCode.UNAUTHORIZED, description);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ConflictError extends BaseError {
    constructor(name, description = constants_1.CONFLICT) {
        super(name, constants_1.HttpStatusCode.CONFLICT, description);
    }
}
exports.ConflictError = ConflictError;
class ForbiddenError extends BaseError {
    constructor(name, description = constants_1.FORBIDDEN) {
        super(name, constants_1.HttpStatusCode.FORBIDDEN, description);
    }
}
exports.ForbiddenError = ForbiddenError;
