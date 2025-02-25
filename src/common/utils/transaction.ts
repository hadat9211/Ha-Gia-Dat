import { QueryRunner } from "typeorm";
import { dataSource } from "../../infrastructure/datasource/datasource";

export const withTransaction = async <T>(
  callback: (queryRunner: QueryRunner) => Promise<T>
) => {
  const queryRunner = dataSource.createQueryRunner("master");
  try {
    await queryRunner.startTransaction();
    const result = await callback(queryRunner);
    await queryRunner.commitTransaction();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

