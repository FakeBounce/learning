export interface ApiResponseMessage {
  value: string;
  level: string;
}
export interface ApiRequestSort {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface ApiResponsePagination {
  page: number;
  rowPerPage: number;
  totalResults: number;
  totalPages: number;
}

export interface OrderBy {
  id: string;
  direction: 'DESC' | 'ASC';
}
