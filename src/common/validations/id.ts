import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class IdDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsPositive()
  @IsPositive()
  id: number;
}
