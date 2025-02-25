"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createResponse;
const logger_api_1 = __importDefault(require("../../middlewares/logger-api"));
const constants_1 = require("../constants");
function createResponse(response, request) {
    let data;
    if (response.data) {
        data = {
            data: response.data,
            page: response.page,
            total: response.total,
            hasMore: response.hasMore,
            totalPages: response.totalPages,
        };
    }
    if (request)
        (0, logger_api_1.default)(request);
    return {
        code: response.code || constants_1.HttpStatusCode.OK,
        message: response.message || "OK",
        data,
    };
}
