import {
  IsOptional,
  IsString,
  IsInt,
  IsISO8601,
  MaxLength,
  IsNumber
} from "class-validator";

export class CreateBookDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  publisher?: string;

  @IsOptional()
  @IsISO8601()
  publishedDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  isbn: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  author: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  language: string;

  @IsOptional()
  @IsNumber()
  pageCount: number;

  @IsOptional()
  @IsInt({ each: true })
  genreIds: number[];
}

