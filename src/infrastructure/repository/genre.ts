import {
  BaseRepository,
  IBaseRepositoryFunctionOption,
} from "./base-repository";
import { Genre, GenreFields } from "../entity";

export class GenreRepository extends BaseRepository<Genre> {
  async findByIds(ids: number[], options?: IBaseRepositoryFunctionOption) {
    if (ids.length === 0) return [];
    return this._selectRunner<Genre[]>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: Genre,
      callback: (queryBuilder) => {
        if (ids && ids.length > 0) {
          if (ids.length === 1) {
            queryBuilder.where(`${GenreFields.id.name} = :ids`, {
              ids: ids[0],
            });
          } else {
            queryBuilder.where(`${GenreFields.id.name} IN (:...ids)`, { ids });
          }
        }
        return queryBuilder.getMany();
      },
    });
  }
  async findByIdOptional(
    ids?: number[],
    options?: IBaseRepositoryFunctionOption
  ) {
    return this._selectRunner<Genre[]>({
      mode: options?.mode,
      entityManager: options?.entityManager,
      entity: Genre,
      callback: (queryBuilder) => {
        if (ids && ids.length > 0) {
          if (ids.length === 1) {
            queryBuilder.where(`${GenreFields.id.name} = :ids`, {
              ids: ids[0],
            });
          } else {
            queryBuilder.where(`${GenreFields.id.name} IN (:...ids)`, { ids });
          }
        }
        return queryBuilder.getMany();
      },
    });
  }
}

