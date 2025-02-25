import { Router } from "express";

import { FindBooksDto } from "../common/validations/find-books";
import { CreateBookDto } from "../common/validations/create-book";
import { UpdateBookDto } from "../common/validations/update-book";
import { IdDto } from "../common/validations";
import {
  createBook,
  deleteBook,
  findBooks,
  findOneBook,
  updateBook,
} from "../controllers/book";
import { validateMiddleware } from "../middlewares/validate";

const bookRouter = Router();

bookRouter.get(
  "/",
  validateMiddleware(FindBooksDto, { isQuery: true }),
  findBooks
);

bookRouter.get(
  "/:id",
  validateMiddleware(IdDto, { paramsField: "id" }),
  findOneBook
);

bookRouter.post("/", validateMiddleware(CreateBookDto), createBook);

bookRouter.put(
  "/:id",
  validateMiddleware(UpdateBookDto, {
    paramsField: "id",
    skipMissingProperties: true,
  }),
  updateBook
);

bookRouter.delete(
  "/:id",
  validateMiddleware(IdDto, { paramsField: "id" }),
  deleteBook
);

export default bookRouter;

