export interface BasicOption {
  readonly label: string;
  readonly value: string;
}

export interface FilterBy {
  operator: 'AND' | 'OR';
  items: [
    {
      field: string;
      operator: string;
      value: string;
    }
  ];
}

export interface TableRequestConfig {
  currentPage: number;
  rowsPerPage: number;
  sort?: ApiRequestSort;
  filters?: FilterBy;
}

export const defaultTableRequestConfig = {
  currentPage: 0,
  rowsPerPage: 10
};

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
