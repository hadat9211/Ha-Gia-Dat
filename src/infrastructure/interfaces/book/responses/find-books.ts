import { Expose, plainToInstance, Type } from "class-transformer";
import { GenreResponseDto } from "../../genre/responses/find-genre";

export class GameResponseDto {
  @Expose()
  id: number;

  @Expose()
  game: string;
}

export class FindBooksResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  publisher: string;

  @Expose()
  publishedDate: Date;

  @Expose()
  isbn: string;

  @Expose()
  author: string;

  @Expose()
  language: string;

  @Expose()
  pageCount: number;

  @Expose()
  genres: GenreResponseDto[];

  static toResponse<T extends FindBooksResponseDto>(data: T | T[]) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }
}

