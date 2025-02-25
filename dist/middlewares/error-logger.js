"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../common/configs/logger");
const errorLogger = (err, req, res, next) => {
    logger_1.logger.error({
        message: err.message,
        method: req.method,
        url: req.originalUrl,
        stack: err.stack,
    });
    next(err);
};
exports.default = errorLogger;
