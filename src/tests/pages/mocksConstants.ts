import { ApiResponsePagination } from '@services/interfaces';

export const defaultPagination: ApiResponsePagination = {
  page: 0,
  rowPerPage: 10,
  totalResults: 10,
  totalPages: 1
};
