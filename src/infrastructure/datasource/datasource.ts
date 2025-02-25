import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const DB_HOST_MASTER = process.env.DB_HOST_MASTER as string;
const DB_PORT_MASTER = Number(process.env.DB_PORT_MASTER);
const DB_USERNAME_MASTER = process.env.DB_USERNAME_MASTER as string;
const DB_PASSWORD_MASTER = process.env.DB_PASSWORD_MASTER as string;
const DB_DATABASE_MASTER = process.env.DB_DATABASE_MASTER as string;
const DB_HOST_SLAVE = process.env.DB_HOST_SLAVE as string;
const DB_PORT_SLAVE = Number(process.env.DB_PORT_SLAVE);
const DB_USERNAME_SLAVE = process.env.DB_USERNAME_SLAVE as string;
const DB_PASSWORD_SLAVE = process.env.DB_PASSWORD_SLAVE as string;
const DB_DATABASE_SLAVE = process.env.DB_DATABASE_SLAVE as string;

export const dataSource = new DataSource({
  type: "mysql",
  entities: [__dirname + "/../../infrastructure/entity/*{.ts,.js}"],
  migrations: [__dirname + "/../../infrastructure/migrations/*{.ts,.js}"],
  synchronize: false,
  logging: true,
  extra: {
    connectionLimit: 4,
  },
  replication: {
    master: {
      host: DB_HOST_MASTER,
      port: DB_PORT_MASTER,
      username: DB_USERNAME_MASTER,
      password: DB_PASSWORD_MASTER,
      database: DB_DATABASE_MASTER,
    },
    slaves: [
      {
        host: DB_HOST_SLAVE,
        port: DB_PORT_SLAVE,
        username: DB_USERNAME_SLAVE,
        password: DB_PASSWORD_SLAVE,
        database: DB_DATABASE_SLAVE,
      },
    ],
  },
});

