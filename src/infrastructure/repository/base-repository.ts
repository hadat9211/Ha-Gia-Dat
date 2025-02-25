import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  ReplicationMode,
  SelectQueryBuilder,
} from "typeorm";

import { dataSource } from "../datasource/datasource";

export class BaseRepository<T extends ObjectLiteral> {
  protected async _selectRunner<K>({
    mode = "slave",
    entityManager,
    entity,
    callback,
  }: {
    mode?: ReplicationMode;
    entityManager?: EntityManager;
    entity: EntityTarget<T>;
    callback: (queryBuilder: SelectQueryBuilder<T>) => Promise<K>;
  }) {
    const queryRunner = dataSource.createQueryRunner(mode);
    const repository = queryRunner.manager.getRepository(entity);
    const tableName = repository.metadata.tableName;
    const queryBuilder = entityManager
      ? entityManager.createQueryBuilder(entity, tableName)
      : repository.createQueryBuilder(tableName);
    try {
      const result = await callback(queryBuilder);
      return result;
    } finally {
      queryRunner.release();
    }
  }
}

export interface IBaseRepositoryFunctionOption {
  mode?: ReplicationMode;
  entityManager?: EntityManager;
}

