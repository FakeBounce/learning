import { Group } from '@services/groups/interfaces';
import {
  ApiResponseMessage,
  ApiResponsePagination,
  TableRequestConfig
} from '@services/interfaces';
import { User } from '@services/users/interfaces';
import { Permissions, UserPermissionObject } from '@services/permissions/interfaces';

export interface UserRole {
  id: number;
  name: string;
  description: string;
  users: User[];
  groups: Group[];
  permissions: [];
}

export interface Role {
  id: number;
  name: string;
  description: string;
  isClientAdmin: boolean;
}

export interface GetRolesRequest extends TableRequestConfig {}

export interface GetRolesResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: Role[];
    pagination: ApiResponsePagination;
  };
}

export interface GetRolePermissionsRequest {
  roleId: number;
}

export interface GetRolePermissionsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Permissions;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  usersId?: number[];
  groupsId?: number[];
}

export interface CreateRoleResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Role;
}

export interface UpdateRoleRequest {
  id: number;
  name?: string;
  description?: string;
  usersId?: number[];
  groupsId?: number[];
  permissions?: UserPermissionObject;
}

export interface UpdateRoleResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Role;
}

export interface DeleteRoleRequest {
  id: number;
}

export interface DeleteRoleResponse {
  success: boolean;
  message: ApiResponseMessage;
}
