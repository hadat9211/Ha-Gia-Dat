import loggerAPI from "../../middlewares/logger-api";
import { HttpStatusCode } from "../constants";

export default function createResponse(
  response: {
    code?: number;
    message?: string;
    data?: unknown;
    page?: number;
    total?: number;
    hasMore?: boolean;
    totalPages?: number;
  },
  request?: any
) {
  if (request) loggerAPI(request);
  return {
    code: response.code || HttpStatusCode.OK,
    message: response.message || "OK",
    data: response.data,
    page: response.page,
    total: response.total,
    hasMore: response.hasMore,
    totalPages: response.totalPages,
  };
}

