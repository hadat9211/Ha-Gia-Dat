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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.findBooks = exports.findOneBook = exports.createBook = void 0;
const book_1 = require("../services/book");
const create_response_1 = __importDefault(require("../common/utils/create-response"));
const constants_1 = require("../common/constants");
const class_transformer_1 = require("class-transformer");
const find_books_1 = require("../common/validations/find-books");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_1.bookService.createBook(req.body);
        res.status(constants_1.HttpStatusCode.CREATED).json((0, create_response_1.default)({
            code: constants_1.HttpStatusCode.CREATED,
            data,
        }, req));
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const findOneBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_1.bookService.findOneBook(Number(req.params.id));
        res.status(constants_1.HttpStatusCode.OK).json((0, create_response_1.default)({
            data,
        }, req));
    }
    catch (error) {
        next(error);
    }
});
exports.findOneBook = findOneBook;
const findBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryParams = (0, class_transformer_1.plainToInstance)(find_books_1.FindBooksDto, req.query, {
            excludeExtraneousValues: true,
        });
        const { data, hasMore, total } = yield book_1.bookService.findBooks(queryParams);
        res.status(constants_1.HttpStatusCode.OK).json((0, create_response_1.default)({
            data,
            hasMore,
            total,
        }, req));
    }
    catch (error) {
        next(error);
    }
});
exports.findBooks = findBooks;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_1.bookService.deleteBook(Number(req.params.id));
        res.status(constants_1.HttpStatusCode.OK).json((0, create_response_1.default)({
            data,
        }, req));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_1.bookService.updateBook(req.body);
        res.status(constants_1.HttpStatusCode.OK).json((0, create_response_1.default)({
            data,
        }, req));
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
