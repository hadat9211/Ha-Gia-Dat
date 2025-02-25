import { CreateBookDto } from "../common/validations/create-book";
import { genreError } from "../common/errors";
import { BookRepository } from "../infrastructure/repository/book";
import { BookToGenreRepository } from "../infrastructure/repository/book-to-genre";
import { GenreRepository } from "../infrastructure/repository/genre";
import { CreateBookResponseDto } from "../infrastructure/interfaces/book/responses/create-project";
import { bookError } from "../common/errors/book";
import { FindBookResponseDto } from "../infrastructure/interfaces/book/responses/find-book";
import { UpdateBookDto } from "../common/validations/update-book";
import { UpdateBookResponseDto } from "../infrastructure/interfaces/book/responses/update-book";
import { getHasMoreInfiniteScroll } from "../common/utils/pagination";
import { FindBooksResponseDto } from "../infrastructure/interfaces/book/responses/find-books";
import { FindBooksDto } from "../common/validations/find-books";
import { BadRequestError, ConflictError } from "../common/utils/base-error";
import { withTransaction } from "../common/utils/transaction";
import { intersection } from "../common/utils/intersection";

class BookService {
  private readonly _bookRepository = new BookRepository();
  private readonly _bookToGenreRepository = new BookToGenreRepository();
  private readonly _genreRepository = new GenreRepository();

  async createBook(createBook: CreateBookDto) {
    const { isExist } = await this._bookRepository.checkBookDuplicate(
      createBook.title,
      createBook.author,
      { mode: "master" }
    );
    if (isExist) {
      throw new ConflictError(bookError.DUPLICATE);
    }

    const genres = await this._genreRepository.findByIdOptional(
      createBook.genreIds
    );
    if (!genres) {
      throw new BadRequestError(genreError.NOT_FOUND);
    }

    return withTransaction(async (queryRunner) => {
      const entityManager = queryRunner.manager;

      const book = await this._bookRepository.create(
        {
          ...createBook,
          title: createBook.title.trim(),
        },
        { entityManager }
      );

      await this._bookToGenreRepository.createManyByBookId(book.id, genres, {
        entityManager,
      });

      return CreateBookResponseDto.toResponse(book);
    });
  }

  async findOneBook(id: number) {
    const book = await this._bookRepository.findById(id);
    if (!book) throw new BadRequestError(bookError.NOT_FOUND);

    const genres = await this._bookToGenreRepository.findByBookId(id);
    return FindBookResponseDto.toResponse({
      ...book,
      genres,
    });
  }

  async updateBook(updateBook: UpdateBookDto) {
    const {
      id,
      title,
      description,
      publisher,
      publishedDate,
      isbn,
      author,
      language,
      pageCount,
      genreIds,
    } = updateBook;

    const isBookExist = await this._bookRepository.isExist(updateBook.id, {
      mode: "master",
    });
    if (!isBookExist) {
      throw new BadRequestError(bookError.NOT_FOUND);
    }

    const { entity } = await this._bookRepository.checkBookDuplicate(
      updateBook.title,
      updateBook.author,
      { mode: "master" }
    );

    if (entity && entity.id !== id)
      throw new ConflictError(bookError.DUPLICATE);

    return withTransaction(async (queryRunner) => {
      const entityManager = queryRunner.manager;

      await this._bookToGenreRepository.deleteByBookId(id, { entityManager });

      const genres = await this._genreRepository.findByIdOptional(genreIds);

      await this._bookToGenreRepository.createManyByBookId(id, genres, {
        entityManager,
      });

      await this._bookRepository.update(
        {
          id,
          title,
          description,
          publisher,
          publishedDate,
          isbn,
          author,
          language,
          pageCount,
        },
        { entityManager }
      );

      return UpdateBookResponseDto.toResponse({ id });
    });
  }

  async deleteBook(id: number): Promise<void> {
    const isBookExist = await this._bookRepository.isExist(id, {
      mode: "master",
    });
    if (!isBookExist) {
      throw new BadRequestError(bookError.NOT_FOUND);
    }

    return withTransaction<void>(async (queryRunner) => {
      const entityManager = queryRunner.manager;
      this._bookToGenreRepository.deleteByBookId(id, {
        entityManager,
      }),
        await this._bookRepository.deleteById(id, { entityManager });
    });
  }

  async findBooks(query: FindBooksDto) {
    const { limit, genreIds, lastId, title } = query;
    let genreBookIds: number[] = [];
    if (genreIds && genreIds.length > 0) {
      genreBookIds = await this._bookToGenreRepository.getBookIdsByGenreIds(
        genreIds
      );
    }
    const fetchLimit = limit + 1;
    const [books, total] = await this._bookRepository.findBooks({
      ...query,
      bookIds: [...genreBookIds],
      title,
      limit: fetchLimit,
      lastId,
    });
    const bookIds = books.map((book) => book.id);
    const bookToGenres = await this._bookToGenreRepository.findByBookIds(
      bookIds
    );

    const genresMap = new Map<
      number,
      { id: number; genre: string; key: string }[]
    >();
    for (const gameToGenre of bookToGenres.flat()) {
      if (!genresMap.has(gameToGenre.bookId)) {
        genresMap.set(gameToGenre.bookId, []);
      }
      genresMap.get(gameToGenre.bookId)!.push({
        id: gameToGenre.id,
        genre: gameToGenre.genre,
        key: gameToGenre.key,
      });
    }
    const hasMore = getHasMoreInfiniteScroll(books, limit);
    return {
      data: books.map((book) =>
        FindBooksResponseDto.toResponse({
          ...book,
          genres: genresMap.get(book.id) || [],
        })
      ),
      hasMore,
      total,
    };
  }
}

export const bookService = new BookService();

