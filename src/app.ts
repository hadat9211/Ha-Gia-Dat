import path from "node:path";

import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import { swaggerOptions } from "./common/configs";
import router from "./router";
import createResponse from "./common/utils/create-response";
import { Environment, HttpStatusCode, NOT_FOUND_ROUTE } from "./common/constants";
import errorLogger from "./middlewares/error-logger";
import errorResponse from "./middlewares/error-response";

const app: Application = express();

app.use(express.json());
app.disable("x-powered-by");

app.use("/assets", express.static(path.join(__dirname, "../assets")));

if (process.env.NODE_ENV !== Environment.PRODUCTION) {
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
}

app.use(cookieParser());

// Init route
app.use("/api", router);

// Handle error
app.use(errorLogger);
app.use(errorResponse);

app.all("*", (_req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json(
    createResponse({
      code: HttpStatusCode.NOT_FOUND,
      message: NOT_FOUND_ROUTE,
    })
  );
});

export default app;
