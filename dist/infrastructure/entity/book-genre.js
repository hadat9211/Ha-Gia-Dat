"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookToGenreFields = exports.BookToGenre = void 0;
const typeorm_1 = require("typeorm");
const book_1 = require("./book");
const genre_1 = require("./genre");
let BookToGenre = class BookToGenre {
};
exports.BookToGenre = BookToGenre;
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_1.Book, (book) => book.bookToGenres),
    (0, typeorm_1.JoinColumn)({
        name: "n4BookId",
        referencedColumnName: "id",
    }),
    (0, typeorm_1.PrimaryColumn)({
        name: "n4BookId",
        type: "int",
        unsigned: true,
    }),
    __metadata("design:type", book_1.Book)
], BookToGenre.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genre_1.Genre, (genre) => genre.bookToGenres),
    (0, typeorm_1.JoinColumn)({
        name: "n4GenreId",
        referencedColumnName: "id",
    }),
    (0, typeorm_1.PrimaryColumn)({
        name: "n4GenreId",
        type: "int",
        unsigned: true,
    }),
    __metadata("design:type", genre_1.Genre)
], BookToGenre.prototype, "genre", void 0);
exports.BookToGenre = BookToGenre = __decorate([
    (0, typeorm_1.Entity)("tt_Book_Genre")
], BookToGenre);
exports.BookToGenreFields = {
    tableName: "tt_Book_Genre",
    book: {
        entity: "book",
        alias: "n4BookId as id",
        name: "n4BookId",
    },
    genre: {
        entity: "genre",
        alias: "n4GenreId as id",
        name: "n4GenreId",
    },
};
