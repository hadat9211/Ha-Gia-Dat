import { DeleteResult } from "typeorm";
import { Book, BookFields } from "../entity";
import {
  BaseRepository,
  IBaseRepositoryFunctionOption,
} from "./base-repository";
import { ICreateBook } from "../interfaces/book/create-book";
import { IUpdateBook } from "../interfaces/book/update-book";
import { IFindBook } from "../interfaces/book/find-books";

export class BookRepository extends BaseRepository<Book> {
  async create(
    createBook: ICreateBook,
    options?: IBaseRepositoryFunctionOption
  ) {
    return this._selectRunner<Book>({
      mode: "master",
      entityManager: options?.entityManager,
      entity: Book,
      callback: async (queryBuilder) => {
        const repository = queryBuilder.connection.getRepository(Book);
        const book = repository.create(createBook);
        const { raw } = await queryBuilder
          .insert()
          .into(Book)
          .values(createBook)
          .updateEntity(false)
          .execute();
        return {
          ...book,
          id: raw.insertId,
        };
      },
    });
  }

  async findById(id: number, options?: IBaseRepositoryFunctionOption) {
    return this._selectRunner<Pick<
      Book,
      | "id"
      | "title"
      | "description"
      | "publisher"
      | "publishedDate"
      | "isbn"
      | "author"
      | "language"
      | "pageCount"
    > | null>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: Book,
      callback: (queryBuilder) => {
        return queryBuilder
          .select([
            `${BookFields.tableName}.${BookFields.id.entity}`,
            `${BookFields.tableName}.${BookFields.description.entity}`,
            `${BookFields.tableName}.${BookFields.title.entity}`,
            `${BookFields.tableName}.${BookFields.publisher.entity}`,
            `${BookFields.tableName}.${BookFields.isbn.entity}`,
            `${BookFields.tableName}.${BookFields.author.entity}`,
            `${BookFields.tableName}.${BookFields.language.entity}`,
            `${BookFields.tableName}.${BookFields.pageCount.entity}`,
          ])
          .where(`${BookFields.tableName}.${BookFields.id.name} = :id`, {
            id,
          })
          .getOne();
      },
    });
  }

  async update(
    updateBook: IUpdateBook,
    options?: IBaseRepositoryFunctionOption
  ) {
    return this._selectRunner<void>({
      mode: "master",
      entityManager: options?.entityManager,
      entity: Book,
      callback: async (queryBuilder) => {
        await queryBuilder
          .update(Book)
          .set(updateBook)
          .where(`id= :id`, { id: updateBook.id })
          .execute();
      },
    });
  }

  async deleteById(bookId: number, options?: IBaseRepositoryFunctionOption) {
    return this._selectRunner<DeleteResult>({
      mode: "master",
      entityManager: options?.entityManager,
      entity: Book,
      callback: (queryBuilder) => {
        return queryBuilder
          .delete()
          .from(Book)
          .where(`${BookFields.id.name} = :bookId`, { bookId })
          .execute();
      },
    });
  }

  async findBooks(query: IFindBook, options?: IBaseRepositoryFunctionOption) {
    return this._selectRunner<[Book[], number]>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: Book,
      callback: async (queryBuilder) => {
        const {
          lastId,
          limit,
          title,
          author,
          language,
          publishedDateFrom,
          publishedDateTo,
          bookIds,
        } = query;

        const bookQuery = queryBuilder.select([
          `${BookFields.tableName}.${BookFields.id.entity}`,
          `${BookFields.tableName}.${BookFields.description.entity}`,
          `${BookFields.tableName}.${BookFields.title.entity}`,
          `${BookFields.tableName}.${BookFields.publisher.entity}`,
          `${BookFields.tableName}.${BookFields.isbn.entity}`,
          `${BookFields.tableName}.${BookFields.author.entity}`,
          `${BookFields.tableName}.${BookFields.language.entity}`,
          `${BookFields.tableName}.${BookFields.pageCount.entity}`,
        ]);

        if (title) {
          bookQuery.andWhere(
            `${BookFields.tableName}.${BookFields.title.name} LIKE :title`,
            { title: `${title}%` }
          );
        }
        if (author) {
          bookQuery.andWhere(
            `${BookFields.tableName}.${BookFields.author.name} LIKE :author`,
            { author: `${author}%` }
          );
        }
        if (language) {
          bookQuery.andWhere(
            `${BookFields.tableName}.${BookFields.language.name} = :language`,
            { language }
          );
        }
        if (publishedDateFrom) {
          bookQuery.andWhere(
            `${BookFields.tableName}.${BookFields.publishedDate.name} >= :publishedDateFrom`,
            { publishedDateFrom }
          );
        }
        if (publishedDateTo) {
          bookQuery.andWhere(
            `${BookFields.tableName}.${BookFields.publishedDate.name} <= :publishedDateTo`,
            { publishedDateTo }
          );
        }
        if (lastId) {
          bookQuery.andWhere(
            `${BookFields.tableName}.${BookFields.id.name} < :lastId`,
            { lastId }
          );
        }
        if (bookIds && bookIds.length > 0) {
          if (bookIds.length === 1) {
            bookQuery.andWhere(
              `${BookFields.tableName}.${BookFields.id.name} = :bookIds`,
              { bookIds }
            );
          } else
            bookQuery.andWhere(
              `${BookFields.tableName}.${BookFields.id.name} IN (:...bookIds)`,
              { bookIds }
            );
        }
        const { count } = await bookQuery
          .clone()
          .select([
            `COUNT(${BookFields.tableName}.${BookFields.id.entity}) as count`,
          ])
          .getRawOne();

        bookQuery.limit(limit);

        const books = await bookQuery.getMany();

        return [books, count * 1];
      },
    });
  }

  async findManyByIds(ids: number[], options?: IBaseRepositoryFunctionOption) {
    return this._selectRunner({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: Book,
      callback: (queryBuilder) => {
        if (ids && ids.length > 0) {
          if (ids.length > 1) {
            queryBuilder.where(
              `${BookFields.tableName}.${BookFields.id.name} IN (:...ids)`,
              { ids }
            );
          } else {
            queryBuilder.where(
              `${BookFields.tableName}.${BookFields.id.name} = :id`,
              { id: ids[0] }
            );
          }
        }

        return queryBuilder.getMany();
      },
    });
  }

  async checkBookDuplicate(
    title: string,
    author: string,
    options?: IBaseRepositoryFunctionOption
  ) {
    return this._selectRunner<{ isExist: boolean; entity?: { id: number } }>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: Book,
      callback: async (queryBuilder) => {
        const entity = await queryBuilder
          .select([`${BookFields.tableName}.${BookFields.id.alias}`])
          .where(`${BookFields.tableName}.${BookFields.title.name} = :title`, {
            title: title.trim(),
          })
          .andWhere(
            `${BookFields.tableName}.${BookFields.author.name} = :author`,
            { author: author.trim() }
          )
          .getRawOne();

        return { isExist: !!entity, entity };
      },
    });
  }

  async isExist(bookId: number, options?: IBaseRepositoryFunctionOption) {
    return this._selectRunner<boolean>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: Book,
      callback: async (queryBuilder) => {
        const entity = await queryBuilder
          .select([`${BookFields.tableName}.${BookFields.id.alias}`])
          .where(`${BookFields.tableName}.${BookFields.id.name} = :bookId`, {
            bookId,
          })
          .getRawOne();

        return !!entity;
      },
    });
  }
}

