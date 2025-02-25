import { IBaseInfiniteScroll } from "../pagination";

export interface IFindBook extends IBaseInfiniteScroll {
  title?: string;
  author?: string;
  language?: string;
  publishedDateFrom?: string;
  publishedDateTo?: string;
  bookIds?: number[];
}

