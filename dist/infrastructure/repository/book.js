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
exports.BookRepository = void 0;
const entity_1 = require("../entity");
const base_repository_1 = require("./base-repository");
class BookRepository extends base_repository_1.BaseRepository {
    create(createBook, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: "master",
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => __awaiter(this, void 0, void 0, function* () {
                    const repository = queryBuilder.connection.getRepository(entity_1.Book);
                    const book = repository.create(createBook);
                    const { raw } = yield queryBuilder
                        .insert()
                        .into(entity_1.Book)
                        .values(createBook)
                        .updateEntity(false)
                        .execute();
                    return Object.assign(Object.assign({}, book), { id: raw.insertId });
                }),
            });
        });
    }
    findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => {
                    return queryBuilder
                        .select([
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.id.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.description.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.title.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.publisher.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.isbn.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.author.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.language.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.pageCount.entity}`,
                    ])
                        .where(`${entity_1.BookFields.tableName}.${entity_1.BookFields.id.name} = :id`, {
                        id,
                    })
                        .getOne();
                },
            });
        });
    }
    update(updateBook, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: "master",
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => __awaiter(this, void 0, void 0, function* () {
                    yield queryBuilder
                        .update(entity_1.Book)
                        .set(updateBook)
                        .where(`id= :id`, { id: updateBook.id })
                        .execute();
                }),
            });
        });
    }
    deleteById(bookId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: "master",
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => {
                    return queryBuilder
                        .delete()
                        .from(entity_1.Book)
                        .where(`${entity_1.BookFields.id.name} = :bookId`, { bookId })
                        .execute();
                },
            });
        });
    }
    findBooks(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => __awaiter(this, void 0, void 0, function* () {
                    const { genreIds, lastId, limit, title, author, language, publisher, publishedDateFrom, publishedDateTo, pageCount } = query;
                    const bookQuery = queryBuilder.select([
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.id.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.description.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.title.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.publisher.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.isbn.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.author.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.language.entity}`,
                        `${entity_1.BookFields.tableName}.${entity_1.BookFields.pageCount.entity}`,
                    ]);
                    if (title) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.title.name} ILIKE :title`, { title: `%${title}%` });
                    }
                    if (author) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.author.name} ILIKE :author`, { author: `%${author}%` });
                    }
                    if (language) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.language.name} = :language`, { language });
                    }
                    if (publisher) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.publisher.name} ILIKE :publisher`, { publisher: `%${publisher}%` });
                    }
                    if (publishedDateFrom) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.publishedDate.name} >= :publishedDateFrom`, { publishedDateFrom });
                    }
                    if (publishedDateTo) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.publishedDate.name} <= :publishedDateTo`, { publishedDateTo });
                    }
                    if (pageCount) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.pageCount.name} = :pageCount`, { pageCount });
                    }
                    if (lastId) {
                        bookQuery.andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.id.name} < :lastId`, { lastId });
                    }
                    if (genreIds === null || genreIds === void 0 ? void 0 : genreIds.length) {
                        bookQuery
                            .innerJoin("book.bookToGenres", "btg")
                            .innerJoin("btg.genre", "genre")
                            .andWhere("genre.id IN (:...genreIds)", { genreIds });
                    }
                    const { count } = yield bookQuery
                        .clone()
                        .select([
                        `COUNT(${entity_1.BookFields.tableName}.${entity_1.BookFields.id.entity}) as count`,
                    ])
                        .getRawOne();
                    bookQuery.limit(limit);
                    const books = yield bookQuery.getMany();
                    return [books, count * 1];
                }),
            });
        });
    }
    findManyByIds(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => {
                    if (ids && ids.length > 0) {
                        if (ids.length > 1) {
                            queryBuilder.where(`${entity_1.BookFields.tableName}.${entity_1.BookFields.id.name} IN (:...ids)`, { ids });
                        }
                        else {
                            queryBuilder.where(`${entity_1.BookFields.tableName}.${entity_1.BookFields.id.name} = :id`, { id: ids[0] });
                        }
                    }
                    return queryBuilder.getMany();
                },
            });
        });
    }
    checkBookDuplicate(title, author, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => __awaiter(this, void 0, void 0, function* () {
                    const entity = yield queryBuilder
                        .select([`${entity_1.BookFields.tableName}.${entity_1.BookFields.id.alias}`])
                        .where(`${entity_1.BookFields.tableName}.${entity_1.BookFields.title.name} = :title`, {
                        title: title.trim(),
                    })
                        .andWhere(`${entity_1.BookFields.tableName}.${entity_1.BookFields.author.name} = :author`, { author: author.trim() })
                        .getRawOne();
                    return { isExist: !!entity, entity };
                }),
            });
        });
    }
    isExist(bookId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: entity_1.Book,
                callback: (queryBuilder) => __awaiter(this, void 0, void 0, function* () {
                    const entity = yield queryBuilder
                        .select([`${entity_1.BookFields.tableName}.${entity_1.BookFields.id.alias}`])
                        .where(`${entity_1.BookFields.tableName}.${entity_1.BookFields.id.name} = :bookId`, {
                        bookId,
                    })
                        .getRawOne();
                    return !!entity;
                }),
            });
        });
    }
}
exports.BookRepository = BookRepository;
