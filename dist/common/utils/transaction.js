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
exports.withTransaction = void 0;
const datasource_1 = require("../../infrastructure/datasource/datasource");
const withTransaction = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = datasource_1.dataSource.createQueryRunner("master");
    try {
        yield queryRunner.startTransaction();
        const result = yield callback(queryRunner);
        yield queryRunner.commitTransaction();
        return result;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        throw error;
    }
    finally {
        yield queryRunner.release();
    }
});
exports.withTransaction = withTransaction;
