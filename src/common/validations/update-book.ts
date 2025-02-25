import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsArray,
  IsNumber,
  IsPositive,
  ArrayMinSize,
} from "class-validator";
import { IdDto } from "./id";

export class UpdateBookDto extends IdDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  publisher: string;

  @IsNotEmpty()
  @IsDateString()
  publishedDate: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  isbn: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  author: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  language: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pageCount: number;

  @IsNotEmpty()
  @IsArray({})
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @IsPositive({ each: true })
  genreIds: number[];
}
