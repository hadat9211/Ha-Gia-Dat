import { DataSource } from "typeorm";

import { faker } from "@faker-js/faker";
import { Book, BookToGenre, Genre } from "../infrastructure/entity";

export const seedBooksAndGenres = async (dataSource: DataSource) => {
  const bookRepository = dataSource.getRepository(Book);
  const genreRepository = dataSource.getRepository(Genre);
  const bookToGenreRepository = dataSource.getRepository(BookToGenre);

  // Delete old data
  await bookToGenreRepository.delete({});
  await bookRepository.delete({});
  await genreRepository.delete({});

  // 1️⃣ Seed genres
  const genreNames = [
    "Fiction",
    "Non-fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Horror",
  ];
  const genres = genreNames.map((name) => {
    const genre = new Genre();
    genre.genre = name;
    return genre;
  });

  await genreRepository.save(genres);
  console.log("✅ Seeded Genres Successfully!");

  // 2️⃣ Seed books
  const books = Array.from({ length: 10 }).map(() => {
    const book = new Book();
    book.title = faker.lorem.words(3);
    book.description = faker.lorem.sentences(2);
    book.publisher = faker.company.name();
    book.publishedDate = faker.date.past();
    book.isbn = faker.string.alphanumeric(13);
    book.author = faker.person.fullName();
    book.language = faker.helpers.arrayElement([
      "English",
      "French",
      "German",
      "Spanish",
    ]);
    book.pageCount = faker.number.int({ min: 100, max: 1000 });

    return book;
  });

  await bookRepository.save(books);
  console.log("✅ Seeded Books Successfully!");

  // 3️⃣ Seed book_to_genre
  const bookToGenres = books.flatMap((book) => {
    const randomGenres = faker.helpers.arrayElements(
      genres,
      faker.number.int({ min: 1, max: 3 })
    ); // random 1-3 genre
    return randomGenres.map((genre: Genre) => {
      const bookToGenre = new BookToGenre();
      bookToGenre.book = book;
      bookToGenre.genre = genre;
      return bookToGenre;
    });
  });

  await bookToGenreRepository.save(bookToGenres);
  console.log("✅ Seeded BookToGenre Successfully!");
};
