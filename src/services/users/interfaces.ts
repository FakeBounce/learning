import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '../interfaces';
import { UserRole } from '@services/roles/interfaces';

export interface User {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  login: string;
  useDoubleAuth: boolean;
  isActive: boolean;
  roles: UserRole[];
  // @todo define the type of the groups
  groups: any[];
}

export interface UserFromAPI {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  login: string;
  use_double_auth: boolean;
  is_active: boolean;
  roles: UserRole[];
  // @todo define the type of the groups
  groups: any[];
}
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
    rows: UserFromAPI[];
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
  data: UserFromAPI;
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
  data: UserFromAPI;
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
  data: UserFromAPI;
}
