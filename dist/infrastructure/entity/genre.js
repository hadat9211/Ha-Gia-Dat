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
exports.GenreFields = exports.Genre = void 0;
const typeorm_1 = require("typeorm");
const book_genre_1 = require("./book-genre");
const base_entity_1 = require("./base-entity");
let Genre = class Genre extends base_entity_1.BaseEntity {
};
exports.Genre = Genre;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "n4GenreId",
        type: "int",
        unsigned: true,
        primaryKeyConstraintName: "gxi_Genre_PK_n4Id",
    }),
    __metadata("design:type", Number)
], Genre.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "strGenre",
        type: "varchar",
        length: 20,
    }),
    __metadata("design:type", String)
], Genre.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_genre_1.BookToGenre, (bookToGenre) => bookToGenre.genre),
    __metadata("design:type", Array)
], Genre.prototype, "bookToGenres", void 0);
exports.Genre = Genre = __decorate([
    (0, typeorm_1.Entity)("gxt_Methodology")
], Genre);
exports.GenreFields = {
    tableName: "tt_Genre",
    id: {
        name: "n4GenreId",
        entity: "id",
        alias: "n4GenreId as id",
    },
    genre: {
        name: "strGenre",
        entity: "genre",
        alias: "strGenre as genre",
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
