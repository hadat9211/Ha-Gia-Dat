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
exports.BookToGenreRepository = void 0;
const entity_1 = require("../entity");
const base_repository_1 = require("./base-repository");
const book_genre_1 = require("../entity/book-genre");
class BookToGenreRepository extends base_repository_1.BaseRepository {
    findByBookId(bookId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: options === null || options === void 0 ? void 0 : options.mode,
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: book_genre_1.BookToGenre,
                callback: (queryBuilder) => {
                    return queryBuilder
                        .select([
                        `${entity_1.GenreFields.tableName}.${entity_1.GenreFields.id.alias}`,
                        `${entity_1.GenreFields.tableName}.${entity_1.GenreFields.genre.alias}`,
                    ])
                        .innerJoin(`${book_genre_1.BookToGenreFields.tableName}.${book_genre_1.BookToGenreFields.genre.entity}`, entity_1.GenreFields.tableName)
                        .where(`${book_genre_1.BookToGenreFields.tableName}.${book_genre_1.BookToGenreFields.book.name} = :bookId`, { bookId })
                        .getRawMany();
                },
            });
        });
    }
    deleteByBookId(bookId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._selectRunner({
                mode: "master",
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: book_genre_1.BookToGenre,
                callback: (queryBuilder) => {
                    return queryBuilder
                        .delete()
                        .from(book_genre_1.BookToGenre)
                        .where(`${book_genre_1.BookToGenreFields.book.name} = :bookId`, {
                        bookId,
                    })
                        .execute();
                },
            });
        });
    }
    createManyByBookId(bookId, genres, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (genres.length === 0)
                return;
            return this._selectRunner({
                mode: "master",
                entityManager: options === null || options === void 0 ? void 0 : options.entityManager,
                entity: book_genre_1.BookToGenre,
                callback: (queryBuilder) => {
                    return queryBuilder
                        .insert()
                        .into(book_genre_1.BookToGenre)
                        .values(genres.map((genre) => ({
                        genre,
                        book: { id: bookId },
                    })))
                        .updateEntity(false)
                        .execute();
                },
            });
        });
    }
}
exports.BookToGenreRepository = BookToGenreRepository;
