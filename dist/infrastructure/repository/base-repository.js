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
exports.BaseRepository = void 0;
const datasource_1 = require("../datasource/datasource");
class BaseRepository {
    _selectRunner(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mode = "slave", entityManager, entity, callback, }) {
            const queryRunner = datasource_1.dataSource.createQueryRunner(mode);
            const repository = queryRunner.manager.getRepository(entity);
            const tableName = repository.metadata.tableName;
            const queryBuilder = entityManager
                ? entityManager.createQueryBuilder(entity, tableName)
                : repository.createQueryBuilder(tableName);
            try {
                const result = yield callback(queryBuilder);
                return result;
            }
            finally {
                queryRunner.release();
            }
        });
    }
}
exports.BaseRepository = BaseRepository;
