import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "./base-entity";
import { Genre } from "./genre";
import { BookToGenre } from "./book-genre";
import { TEntityFields } from "../../common/types/entity";

export const INSIGHT_TITLE_MAX_LENGTH = 255;
export const INSIGHT_DETAIL_MAX_LENGTH = 500;
export const INSIGHT_RELATED_DATA_MAX_LENGTH = 500;
export const INSIGHT_IMPROVE_SUGGESTION_MAX_LENGTH = 500;
export const INSIGHT_STAKE_HOLDER_MAX_LENGTH = 500;

@Entity("tt_Book")
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "n4BookId",
    type: "int",
    unsigned: true,
    primaryKeyConstraintName: "gxi_Book_PK_n4Id",
  })
  id: number;

  @Column({
    name: "strTitle",
    type: "varchar",
    length: INSIGHT_DETAIL_MAX_LENGTH,
    nullable: false,
  })
  title: string;

  @Column({
    name: "strDescription",
    type: "varchar",
    length: INSIGHT_RELATED_DATA_MAX_LENGTH,
    nullable: true,
  })
  description: string;

  @Column({
    name: "strPublisher",
    type: "varchar",
    length: INSIGHT_IMPROVE_SUGGESTION_MAX_LENGTH,
    nullable: true,
  })
  publisher: string;

  @Column({
    name: "strPublishedDate",
    type: "varchar",
    length: INSIGHT_STAKE_HOLDER_MAX_LENGTH,
    nullable: true,
  })
  publishedDate: Date;

  @Column({
    name: "strISBN",
    type: "varchar",
    length: INSIGHT_STAKE_HOLDER_MAX_LENGTH,
    nullable: false,
  })
  isbn: string;

  @Column({
    name: "strAuthor",
    type: "varchar",
    length: INSIGHT_STAKE_HOLDER_MAX_LENGTH,
    nullable: false,
  })
  author: string;

  @Column({
    name: "strLanguage",
    type: "varchar",
    length: INSIGHT_STAKE_HOLDER_MAX_LENGTH,
    nullable: false,
  })
  language: string;

  @Column({
    name: "n4PageCount",
    type: "varchar",
    length: INSIGHT_STAKE_HOLDER_MAX_LENGTH,
    nullable: false,
  })
  pageCount: number;

  @OneToMany(() => BookToGenre, (bookToGenre) => bookToGenre.genre)
  bookToGenres: BookToGenre[];
  // replace many to many relations
  genres: Genre[];
}

export const BookFields: TEntityFields <Omit<Book, "genres" | "bookToGenres">> = {
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

