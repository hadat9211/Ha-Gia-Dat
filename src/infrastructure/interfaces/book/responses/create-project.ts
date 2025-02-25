import { Expose, plainToInstance } from "class-transformer";

export class CreateBookResponseDto {
  @Expose()
  id: number;

  static toResponse<T extends CreateBookResponseDto>(data: T) {
    return plainToInstance(this, data, { excludeExtraneousValues: true });
  }
}

