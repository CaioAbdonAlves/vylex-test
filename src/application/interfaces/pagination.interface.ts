export const DEFAULT_PAGE_SIZE = 10;

export interface PaginationType<T> {
  data: Array<T>;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    lastPage: boolean;
    firstPage: boolean;
  };
}

export interface PaginationFilter {
  pageNumber: number;
  pageSize?: number;
}
