"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_error_1 = require("../common/utils/base-error");
const validateMiddleware = (classValidate, options) => (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isQuery = (_a = options === null || options === void 0 ? void 0 : options.isQuery) !== null && _a !== void 0 ? _a : false;
    const shouldSkipMissingProperties = (_b = options === null || options === void 0 ? void 0 : options.skipMissingProperties) !== null && _b !== void 0 ? _b : false;
    // check body, query field
    const request = isQuery ? req.query : req.body;
    // check params field
    if (options === null || options === void 0 ? void 0 : options.paramsField) {
        request[options.paramsField] = req.params[options.paramsField];
    }
    const dataValidate = (0, class_transformer_1.plainToInstance)(classValidate, request);
    const errors = yield (0, class_validator_1.validate)(dataValidate, {
        skipMissingProperties: shouldSkipMissingProperties,
    });
    if (errors.length > 0) {
        const message = errors.map((error) => {
            const mapError = error.constraints &&
                Object.values(error.constraints).map((error_) => {
                    return error_;
                });
            return mapError;
        });
        next(new base_error_1.BadRequestError(message.join(" , ")));
    }
    else {
        req[isQuery ? "query" : "body"] = dataValidate;
        if (options === null || options === void 0 ? void 0 : options.paramsField) {
            req.params[options === null || options === void 0 ? void 0 : options.paramsField] = dataValidate[options === null || options === void 0 ? void 0 : options.paramsField];
        }
        next();
    }
});
exports.validateMiddleware = validateMiddleware;
