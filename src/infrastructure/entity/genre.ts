import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { BookToGenre } from "./book-genre";
import { BaseEntity } from "./base-entity";
import { TEntityFields } from "../../common/types";

@Entity("tt_Genre")
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "n4GenreId",
    type: "int",
    unsigned: true,
    primaryKeyConstraintName: "gxi_Genre_PK_n4Id",
  })
  id: number;

  @Column({
    name: "strGenre",
    type: "varchar",
    length: 20,
  })
  genre: string;

  @OneToMany(() => BookToGenre, (bookToGenre) => bookToGenre.genre)
  bookToGenres: BookToGenre[];
}

export const GenreFields: TEntityFields<Omit<Genre, "bookToGenres">> = {
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
