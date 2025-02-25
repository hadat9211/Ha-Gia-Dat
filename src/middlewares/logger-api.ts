import { Request } from "express";
import { logger } from "../common/configs/logger";


/**
 * Middleware log API request
 * @param req Request từ Express
 */
export default function loggerAPI(req: Request) {
  const { method, originalUrl, body, query, params } = req;
  logger.info(
    `[API Request] ${method} ${originalUrl} | Body: ${JSON.stringify(
      body
    )} | Query: ${JSON.stringify(query)} | Params: ${JSON.stringify(params)}`
  );
}
