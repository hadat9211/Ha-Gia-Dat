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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const errors_1 = require("../common/errors");
const book_1 = require("../infrastructure/repository/book");
const book_to_genre_1 = require("../infrastructure/repository/book-to-genre");
const genre_1 = require("../infrastructure/repository/genre");
const create_project_1 = require("../infrastructure/interfaces/book/responses/create-project");
const book_2 = require("../common/errors/book");
const find_book_1 = require("../infrastructure/interfaces/book/responses/find-book");
const update_book_1 = require("../infrastructure/interfaces/book/responses/update-book");
const pagination_1 = require("../common/utils/pagination");
const find_books_1 = require("../infrastructure/interfaces/book/responses/find-books");
const base_error_1 = require("../common/utils/base-error");
const transaction_1 = require("../common/utils/transaction");
class BookService {
    constructor() {
        this._bookRepository = new book_1.BookRepository();
        this._bookToGenreRepository = new book_to_genre_1.BookToGenreRepository();
        this._genreRepository = new genre_1.GenreRepository();
    }
    createBook(createBook) {
        return __awaiter(this, void 0, void 0, function* () {
            const { isExist } = yield this._bookRepository.checkBookDuplicate(createBook.title, createBook.author, { mode: "master" });
            if (isExist) {
                throw new base_error_1.ConflictError(book_2.bookError.DUPLICATE);
            }
            const genres = yield this._genreRepository.findByIdOptional(createBook.genreIds);
            if (!genres) {
                throw new base_error_1.BadRequestError(errors_1.genreError.NOT_FOUND);
            }
            return (0, transaction_1.withTransaction)((queryRunner) => __awaiter(this, void 0, void 0, function* () {
                const entityManager = queryRunner.manager;
                const book = yield this._bookRepository.create(Object.assign(Object.assign({}, createBook), { title: createBook.title.trim() }), { entityManager });
                yield this._bookToGenreRepository.createManyByBookId(book.id, genres, {
                    entityManager,
                });
                return create_project_1.CreateBookResponseDto.toResponse(book);
            }));
        });
    }
    findOneBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this._bookRepository.findById(id);
            if (!book)
                throw new base_error_1.BadRequestError(book_2.bookError.NOT_FOUND);
            const genres = yield this._bookToGenreRepository.findByBookId(id);
            return find_book_1.FindBookResponseDto.toResponse(Object.assign(Object.assign({}, book), { genres }));
        });
    }
    updateBook(updateBook) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, description, publisher, publishedDate, isbn, author, language, pageCount, genreIds, } = updateBook;
            const isBookExist = yield this._bookRepository.isExist(updateBook.id, {
                mode: "master",
            });
            if (!isBookExist) {
                throw new base_error_1.BadRequestError(book_2.bookError.NOT_FOUND);
            }
            const { entity } = yield this._bookRepository.checkBookDuplicate(updateBook.title, updateBook.author, { mode: "master" });
            if (entity && entity.id !== id)
                throw new base_error_1.ConflictError(book_2.bookError.DUPLICATE);
            return (0, transaction_1.withTransaction)((queryRunner) => __awaiter(this, void 0, void 0, function* () {
                const entityManager = queryRunner.manager;
                yield this._bookToGenreRepository.deleteByBookId(id, { entityManager });
                const genres = yield this._genreRepository.findByIdOptional(genreIds);
                yield this._bookToGenreRepository.createManyByBookId(id, genres, {
                    entityManager,
                });
                yield this._bookRepository.update({
                    id,
                    title,
                    description,
                    publisher,
                    publishedDate,
                    isbn,
                    author,
                    language,
                    pageCount,
                }, { entityManager });
                return update_book_1.UpdateBookResponseDto.toResponse({ id });
            }));
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isBookExist = yield this._bookRepository.isExist(id, {
                mode: "master",
            });
            if (!isBookExist) {
                throw new base_error_1.BadRequestError(book_2.bookError.NOT_FOUND);
            }
            return (0, transaction_1.withTransaction)((queryRunner) => __awaiter(this, void 0, void 0, function* () {
                const entityManager = queryRunner.manager;
                this._bookToGenreRepository.deleteByBookId(id, {
                    entityManager,
                }),
                    yield this._bookRepository.deleteById(id, { entityManager });
            }));
        });
    }
    findBooks(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lastId, limit, genreIds } = query, filters = __rest(query, ["lastId", "limit", "genreIds"]);
            const fetchLimit = limit + 1;
            const [books, total] = yield this._bookRepository.findBooks(Object.assign(Object.assign({}, filters), { genreIds: (genreIds === null || genreIds === void 0 ? void 0 : genreIds.length) ? genreIds : undefined, limit: fetchLimit, lastId }));
            const hasMore = (0, pagination_1.getHasMoreInfiniteScroll)(books, limit);
            return {
                data: find_books_1.FindBooksResponseDto.toResponse(books),
                hasMore,
                total,
            };
        });
    }
}
exports.bookService = new BookService();
