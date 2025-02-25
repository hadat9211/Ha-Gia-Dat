"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const find_books_1 = require("../common/validations/find-books");
const create_book_1 = require("../common/validations/create-book");
const update_book_1 = require("../common/validations/update-book");
const validations_1 = require("../common/validations");
const book_1 = require("../controllers/book");
const validate_1 = require("../middlewares/validate");
const bookRouter = (0, express_1.Router)();
const _PREFIX = "/book";
bookRouter.get(_PREFIX + "/", (0, validate_1.validateMiddleware)(find_books_1.FindBooksDto, { isQuery: true }), book_1.findBooks);
bookRouter.get(_PREFIX + "/:id", (0, validate_1.validateMiddleware)(validations_1.IdDto, { paramsField: "id" }), book_1.findOneBook);
bookRouter.post(_PREFIX + "/", (0, validate_1.validateMiddleware)(create_book_1.CreateBookDto), book_1.createBook);
bookRouter.put(_PREFIX + "/:id", (0, validate_1.validateMiddleware)(update_book_1.UpdateBookDto, {
    paramsField: "id",
    skipMissingProperties: true,
}), book_1.updateBook);
bookRouter.delete(_PREFIX + "/:id", (0, validate_1.validateMiddleware)(validations_1.IdDto, { paramsField: "id" }), book_1.deleteBook);
exports.default = bookRouter;
