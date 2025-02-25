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
exports.GenreRepository = void 0;
const base_repository_1 = require("./base-repository");
const entity_1 = require("../entity");
class GenreRepository extends base_repository_1.BaseRepository {
    findByIds(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ids.length === 0)
                return [];
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Genre,
                callback: (queryBuilder) => {
                    if (ids && ids.length > 0) {
                        if (ids.length === 1) {
                            queryBuilder.where(`${entity_1.GenreFields.id.name} = :ids`, {
                                ids: ids[0],
                            });
                        }
                        else {
                            queryBuilder.where(`${entity_1.GenreFields.id.name} IN (:...ids)`, { ids });
                        }
                    }
                    return queryBuilder.getMany();
                },
            });
        });
    }
    findByIdOptional(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ids.length === 0)
                return [];
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Genre,
                callback: (queryBuilder) => {
                    if (ids && ids.length > 0) {
                        if (ids.length === 1) {
                            queryBuilder.where(`${entity_1.GenreFields.id.name} = :ids`, {
                                ids: ids[0],
                            });
                        }
                        else {
                            queryBuilder.where(`${entity_1.GenreFields.id.name} IN (:...ids)`, { ids });
                        }
                    }
                    return queryBuilder.getMany();
                },
            });
        });
    }
}
exports.GenreRepository = GenreRepository;
