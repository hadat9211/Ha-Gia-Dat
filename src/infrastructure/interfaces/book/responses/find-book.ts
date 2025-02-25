import { Expose, plainToInstance, Type } from "class-transformer";
import { GenreResponseDto } from "../../genre/responses/find-genre";

export class FindBookResponseDto {
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
  @Type(() => GenreResponseDto)
  genres: GenreResponseDto[];

  static toResponse<T extends FindBookResponseDto>(data: T) {
    return plainToInstance(this, data, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}

