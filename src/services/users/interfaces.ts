import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '../interfaces';
import { User } from '@services/connected-user/interfaces';

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
  * To get a specific user
*/
export interface GetSingleUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: User;
}

/*
  * API Request and Response
  * To update user
*/
export interface UpdateUserRequest {
  id: number;
  lastname?: string;
  firstname?: string;
  email?: string;
  login?: string;
  use_double_auth?: boolean;
}

export interface UpdateUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: User;
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
