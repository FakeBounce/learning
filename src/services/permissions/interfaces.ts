export interface UserPermission {
  id: number;
  name: PermissionKey;
}

export type PermissionKey = `${PermissionEnum}_${PermissionTypeEnum}`;

export enum PermissionEnum {
  CREATE = 'add',
  READ = 'see',
  UPDATE = 'update',
  DELETE = 'delete',
  CREATE_BULK = 'add_mass',
  BLOCK_UNBLOCK = 'block'
}

export enum PermissionTypeEnum {
  PERSONALIZATION = 'personalization',
  USERS = 'users',
  TESTERS = 'testers',
  APPLICANTS = 'students',
  ROLES = 'roles',
  GROUPS = 'groups',
  MODULES = 'modules',
  COURSES = 'courses',
  STATS = 'stats',
  SUPER_ADMIN = 'super_admin',
  CLIENT_ADMIN = 'client_admin'
}

export interface PermissionTypeList {
  title: string;
  actions: RolePermission[];
}

export interface RolePermission {
  name: string;
  id: number;
  enabled: boolean;
}
