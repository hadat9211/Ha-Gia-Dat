import { NextFunction, Request, Response } from "express";
import { bookService } from "../services/book";
import createResponse from "../common/utils/create-response";
import { HttpStatusCode } from "../common/constants";
import { plainToInstance } from "class-transformer";
import { FindBooksDto } from "../common/validations/find-books";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await bookService.createBook(req.body);
    res.status(HttpStatusCode.CREATED).json(
      createResponse(
        {
          code: HttpStatusCode.CREATED,
          data,
        },
        req
      )
    );
  } catch (error) {
    next(error);
  }
};
export const findOneBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await bookService.findOneBook(Number(req.params.id));
    res.status(HttpStatusCode.OK).json(
      createResponse(
        {
          data,
        },
        req
      )
    );
  } catch (error) {
    next(error);
  }
};

export const findBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, hasMore, total } = await bookService.findBooks({
      title: req.query.title?.toString(),
      author: req.query.author?.toString(),
      language: req.query.language?.toString(),
      publishedDateFrom: req.query.publishedDateFrom?.toString(),
      publishedDateTo: req.query.publishedDateTo?.toString(),
      genreIds: req.query.genreIds as unknown as number[],
      limit: Number(req.query.limit),
      lastId: Number(req.query.lastId),
    });
    res.status(HttpStatusCode.OK).json(
      createResponse(
        {
          data,
          hasMore,
          total,
        },
        req
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await bookService.deleteBook(Number(req.params.id));

    res.status(HttpStatusCode.OK).json(
      createResponse(
        {
          data,
        },
        req
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await bookService.updateBook(req.body);

    res.status(HttpStatusCode.OK).json(
      createResponse(
        {
          data,
        },
        req
      )
    );
  } catch (error) {
    next(error);
  }
};

