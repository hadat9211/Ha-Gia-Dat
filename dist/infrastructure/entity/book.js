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
exports.BookFields = exports.Book = exports.INSIGHT_STAKE_HOLDER_MAX_LENGTH = exports.INSIGHT_IMPROVE_SUGGESTION_MAX_LENGTH = exports.INSIGHT_RELATED_DATA_MAX_LENGTH = exports.INSIGHT_DETAIL_MAX_LENGTH = exports.INSIGHT_TITLE_MAX_LENGTH = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base-entity");
const book_genre_1 = require("./book-genre");
exports.INSIGHT_TITLE_MAX_LENGTH = 255;
exports.INSIGHT_DETAIL_MAX_LENGTH = 500;
exports.INSIGHT_RELATED_DATA_MAX_LENGTH = 500;
exports.INSIGHT_IMPROVE_SUGGESTION_MAX_LENGTH = 500;
exports.INSIGHT_STAKE_HOLDER_MAX_LENGTH = 500;
let Book = class Book extends base_entity_1.BaseEntity {
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "n4BookId",
        type: "int",
        unsigned: true,
        primaryKeyConstraintName: "gxi_Book_PK_n4Id",
    }),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strTitle",
        type: "varchar",
        length: exports.INSIGHT_DETAIL_MAX_LENGTH,
        nullable: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strDescription",
        type: "varchar",
        length: exports.INSIGHT_RELATED_DATA_MAX_LENGTH,
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strPublisher",
        type: "varchar",
        length: exports.INSIGHT_IMPROVE_SUGGESTION_MAX_LENGTH,
        nullable: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "publisher", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strPublishedDate",
        type: "varchar",
        length: exports.INSIGHT_STAKE_HOLDER_MAX_LENGTH,
        nullable: true,
    }),
    __metadata("design:type", Date)
], Book.prototype, "publishedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strISBN",
        type: "varchar",
        length: exports.INSIGHT_STAKE_HOLDER_MAX_LENGTH,
        nullable: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strAuthor",
        type: "varchar",
        length: exports.INSIGHT_STAKE_HOLDER_MAX_LENGTH,
        nullable: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strLanguage",
        type: "varchar",
        length: exports.INSIGHT_STAKE_HOLDER_MAX_LENGTH,
        nullable: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "n4PageCount",
        type: "varchar",
        length: exports.INSIGHT_STAKE_HOLDER_MAX_LENGTH,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Book.prototype, "pageCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_genre_1.BookToGenre, (bookToGenre) => bookToGenre.genre),
    __metadata("design:type", Array)
], Book.prototype, "bookToGenres", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)("tt_Book")
], Book);
exports.BookFields = {
    tableName: "tt_Book",
    id: {
        name: "n4BookId",
        entity: "id",
        alias: "n4BookId as id",
    },
    description: {
        name: "strDescription",
        entity: "description",
        alias: "strDescription as description",
    },
    title: {
        name: "strTitle",
        entity: "title",
        alias: "strTitle as title",
    },
    publisher: {
        name: "strPublisher",
        entity: "publisher",
        alias: "strPublisher as publisher",
    },
    isbn: {
        name: "strISBN",
        entity: "isbn",
        alias: "strISBN as isbn",
    },
    publishedDate: {
        name: "dtPublishedDate",
        entity: "publishedDate",
        alias: "dtPublishedDate as publishedDate",
    },
    author: {
        name: "strAuthor",
        entity: "author",
        alias: "strAuthor as author",
    },
    language: {
        name: "strLanguage",
        entity: "language",
        alias: "strLanguage as language",
    },
    pageCount: {
        name: "n4PageCount",
        entity: "pageCount",
        alias: "n4PageCount as pageCount",
    },
    createdAt: {
        name: "dtCreate",
        entity: "createdAt",
        alias: "dtCreate as createdAt",
    },
    updatedAt: {
        name: "dtUpdate",
        entity: "updatedAt",
        alias: "dtUpdate as updatedAt",
    },
};
