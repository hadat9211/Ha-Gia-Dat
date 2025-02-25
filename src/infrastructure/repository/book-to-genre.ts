import { DeleteResult, InsertResult } from "typeorm";

import { Genre, GenreFields } from "../entity";
import {
  BaseRepository,
  IBaseRepositoryFunctionOption,
} from "./base-repository";
import { BookToGenre, BookToGenreFields } from "../entity/book-genre";

export class BookToGenreRepository extends BaseRepository<BookToGenre> {
  async findByBookId(bookId: number, options?: IBaseRepositoryFunctionOption) {
    return this._selectRunner<Pick<Genre, "id" | "genre">[]>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: BookToGenre,
      callback: (queryBuilder) => {
        return queryBuilder
          .select([
            `${GenreFields.tableName}.${GenreFields.id.alias}`,
            `${GenreFields.tableName}.${GenreFields.genre.alias}`,
          ])
          .innerJoin(
            `${BookToGenreFields.tableName}.${BookToGenreFields.genre.entity}`,
            GenreFields.tableName
          )
          .where(
            `${BookToGenreFields.tableName}.${BookToGenreFields.book.name} = :bookId`,
            { bookId }
          )
          .getRawMany();
      },
    });
  }

  async deleteByBookId(
    bookId: number,
    options?: IBaseRepositoryFunctionOption
  ) {
    return this._selectRunner<DeleteResult>({
      mode: "master",
      entityManager: options?.entityManager,
      entity: BookToGenre,
      callback: (queryBuilder) => {
        return queryBuilder
          .delete()
          .from(BookToGenre)
          .where(`${BookToGenreFields.book.name} = :bookId`, {
            bookId,
          })
          .execute();
      },
    });
  }

  async createManyByBookId(
    bookId: number,
    genres: Genre[],
    options?: IBaseRepositoryFunctionOption
  ) {
    if (genres.length === 0) return;
    return this._selectRunner<InsertResult>({
      mode: "master",
      entityManager: options?.entityManager,
      entity: BookToGenre,
      callback: (queryBuilder) => {
        return queryBuilder
          .insert()
          .into(BookToGenre)
          .values(
            genres.map((genre) => ({
              genre,
              book: { id: bookId },
            }))
          )
          .updateEntity(false)
          .execute();
      },
    });
  }

  async findByBookIds(
    bookIds: number[],
    options?: IBaseRepositoryFunctionOption
  ) {
    return this._selectRunner<
      { id: number; genre: string; key: string; bookId: number }[]
    >({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: BookToGenre,
      callback: (queryBuilder) => {
        queryBuilder
          .select([
            `${GenreFields.tableName}.${GenreFields.id.alias}`,
            `${GenreFields.tableName}.${GenreFields.genre.alias}`,
            `${BookToGenreFields.tableName}.${BookToGenreFields.book.name} as bookId`,
          ])
          .innerJoin(
            `${BookToGenreFields.tableName}.${BookToGenreFields.genre.entity}`,
            GenreFields.tableName
          );
        if (bookIds && bookIds.length > 0) {
          if (bookIds.length === 1) {
            queryBuilder.where(
              `${BookToGenreFields.tableName}.${BookToGenreFields.book.name} = :ids`,
              { ids: bookIds[0] }
            );
          } else {
            queryBuilder.where(
              `${BookToGenreFields.tableName}.${BookToGenreFields.book.name} IN (:...ids)`,
              { ids: bookIds }
            );
          }
        }
        return queryBuilder.getRawMany();
      },
    });
  }

  async getBookIdsByGenreIds(
    genreIds: number[],
    options?: IBaseRepositoryFunctionOption
  ) {
    return this._selectRunner<number[]>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: BookToGenre,
      callback: async (queryBuilder) => {
        const query = queryBuilder
          .select(`${BookToGenreFields.book.alias}`)
          .groupBy(`${BookToGenreFields.book.name}`);
        const result =
          genreIds.length === 1
            ? await query
                .where(`${BookToGenreFields.genre.name} = :genreIds`, {
                  genreIds: genreIds.at(0),
                })
                .getRawMany()
            : await query
                .where(`${BookToGenreFields.genre.name} IN (:...genreIds)`, {
                  genreIds,
                })
                .getRawMany();

        return result.map(({ id }) => id);
      },
    });
  }
}

