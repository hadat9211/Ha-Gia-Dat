import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class BasePaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit = 10;
}

export class BaseInfiniteScrollDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  lastId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit = 10;
}

