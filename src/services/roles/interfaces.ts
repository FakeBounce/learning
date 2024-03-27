import { Group } from '@services/groups/interfaces';
import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '@services/interfaces';
import { User } from '@services/users/interfaces';
import { PermissionTypeList } from '@services/permissions/interfaces';

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

export interface GetRolesRequest {
  currentPage: number;
  rowsPerPage: number;
  sort?: ApiRequestSort;
  filters?: any;
}

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
  data: PermissionTypeList;
}
