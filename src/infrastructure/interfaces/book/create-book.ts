export interface ICreateBook {
  title: string;
  description?: string;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  author?: string;
  language?: string;
  pageCount?: number;
  genreIds?: number[];
}

