import { Book } from "../../entity";

export interface IUpdateBook
  extends Omit<Book, "genres" | "createdAt" | "updatedAt" | "bookToGenres"> {}

