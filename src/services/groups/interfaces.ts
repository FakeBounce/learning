import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '@services/interfaces';

export interface Group {
  id: number;
  name: string;
  description: string;
  organisationId?: number;
  isMain?: boolean;
  nbUsers?: number;
}

export interface GetGroupsRequest {
  currentPage: number;
  rowsPerPage: number;
  sort?: ApiRequestSort;
  filters?: any;
}

export interface GetGroupsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: Group[];
    pagination: ApiResponsePagination;
  };
}