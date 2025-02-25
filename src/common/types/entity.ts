export type TEntityFields<T> = {
  [P in keyof T]: { name: string; alias: string; entity: string };
} & { tableName: string };

