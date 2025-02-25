import * as dotenv from "dotenv";
import app from "./app";
import { dataSource } from "./infrastructure/datasource/datasource";
import { logger } from "./common/configs/logger";

dotenv.config();

const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  // database connect
  dataSource
    .initialize()
    .then(() => {
      logger.info("Database connected");
    })
    .catch((error) => {
      logger.error(JSON.stringify(error));
    });

  // server start
  logger.info(`Server running on http://${HOST}:${PORT}`);
});
