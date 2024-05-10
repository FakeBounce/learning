import { ApiResponseMessage, ApiResponsePagination, TableRequestConfig } from '../interfaces';
import { Role } from '@services/roles/interfaces';

export interface User {
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  login: string;
  useDoubleAuth: boolean;
  isActive: boolean;
  roles: Role[];
  // @todo define the type of the groups
  groups: any[];
}

export interface UserForBulk {
  email: string;
  firstname: string;
  lastname: string;
  login: string;
}

/**
 * API Request and Response
 * To get a list of users
 */
export interface GetUsersRequest extends TableRequestConfig {}

export interface GetUsersResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: User[];
    pagination: ApiResponsePagination;
  };
}

/**
 * API Request and Response
 * To get a specific user
 */
export interface GetSingleUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: User;
}

/**
 * API Request and Response
 * To update user
 */
export interface UpdateUserRequest {
  id: number;
  lastname?: string;
  firstname?: string;
  email?: string;
  login?: string;
  useDoubleAuth?: boolean;
}

export interface UpdateUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: User;
}

/**
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

/**
 * API Request and Response
 * To create bulk users
 */
export type BulkUserRequest = UserForBulk[];

export interface BulkUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: User[];
}
