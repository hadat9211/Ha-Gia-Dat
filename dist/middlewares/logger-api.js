"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loggerAPI;
const logger_1 = require("../common/configs/logger");
/**
 * Middleware log API request
 * @param req Request từ Express
 */
function loggerAPI(req) {
    const { method, originalUrl, body, query, params } = req;
    logger_1.logger.info(`[API Request] ${method} ${originalUrl} | Body: ${JSON.stringify(body)} | Query: ${JSON.stringify(query)} | Params: ${JSON.stringify(params)}`);
}
