import { Transform, Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsDate,
  IsArray,
  IsNumber,
  IsPositive,
} from "class-validator";
import { BaseInfiniteScrollDto } from "./base-pagination";
import { TransformToArray } from "../decorators";

export class FindBooksDto extends BaseInfiniteScrollDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  publishedDateFrom?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  publishedDateTo?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsPositive({ each: true })
  @TransformToArray()
  genreIds?: number[];

  @Transform(({ value }) => Number(value) || 10)
  @IsNumber()
  limit: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  lastId?: number;
}

