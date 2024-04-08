export interface OrderBy {
  id: string;
  direction: 'DESC' | 'ASC';
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
  sort?: { field: string; direction: 'ASC' | 'DESC' };
  filters?: FilterBy;
}

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
