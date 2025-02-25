import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Book } from "./book";
import { Genre } from "./genre";
import { TEntityFields } from "../../common/types";

@Entity("tt_Book_Genre")
export class BookToGenre {
  @ManyToOne(() => Book, (book) => book.bookToGenres)
  @JoinColumn({
    name: "n4BookId",
    referencedColumnName: "id",
  })
  @PrimaryColumn({
    name: "n4BookId",
    type: "int",
    unsigned: true,
  })
  book: Book;

  @ManyToOne(() => Genre, (genre) => genre.bookToGenres)
  @JoinColumn({
    name: "n4GenreId",
    referencedColumnName: "id",
  })
  @PrimaryColumn({
    name: "n4GenreId",
    type: "int",
    unsigned: true,
  })
  genre: Genre;
}

export const BookToGenreFields: TEntityFields<BookToGenre> = {
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
