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
  row_per_page: number;
  total_results: number;
  total_pages: number;
}

