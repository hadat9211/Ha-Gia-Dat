"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../common/constants");
const errorResponse = (err, req, res, next) => {
    const statusCode = err.httpCode || constants_1.HttpStatusCode.INTERNAL_SERVER;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        code: statusCode,
        message,
    });
};
exports.default = errorResponse;
