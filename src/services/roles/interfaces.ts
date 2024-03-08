import { Group } from '@services/groups/interfaces';
import { User } from '@services/connected-user/interfaces';
import { ApiResponseMessage } from '@services/interfaces';
import { PermissionTypeList } from '@services/permissions/interfaces';

export interface Role {
  id: number;
  name: string;
  description: string;
  users: User[];
  groups: Group[];
  permissions: [];
}

export interface UserRole {
  id: number;
  name: string;
  description: string;
}

export interface GetRolePermissionsRequest {
  roleId: number;
}

export interface GetRolePermissionsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: PermissionTypeList;
}
