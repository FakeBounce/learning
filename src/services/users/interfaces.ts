import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '../interfaces';
import { User } from '@services/connected-user/interfaces.ts';

/*
 * API Request and Response
 * To get a list of users
 */
export interface GetUsersRequest {
  currentPage: number;
  rowsPerPage: number;
  filters?: any;
  sort?: ApiRequestSort;
}

export interface GetUsersResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: User[];
    pagination: ApiResponsePagination;
  };
}

/*
 * API Request and Response
 * To toggle user block
 */
export interface UpdateUserBlockRequest {
  setActive: boolean;
  userId: number;
}

export interface UpdateUserBlockResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: User;
}
