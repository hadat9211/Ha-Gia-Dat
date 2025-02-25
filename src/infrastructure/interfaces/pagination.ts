export interface IBasePagination {
  limit: number;
  offset: number;
}
export interface IBaseInfiniteScroll {
  lastId?: number;
  limit: number;
}
