export interface UserPermission {
  id: number;
  name: PermissionKey;
}

export type UserPermissionObject = {
  [key in PermissionKey]: boolean;
};

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

export interface Permissions {
  [PermissionTypeEnum.PERSONALIZATION]: PermissionTypeList;
  [PermissionTypeEnum.USERS]: PermissionTypeList;
  [PermissionTypeEnum.TESTERS]: PermissionTypeList;
  [PermissionTypeEnum.APPLICANTS]: PermissionTypeList;
  [PermissionTypeEnum.ROLES]: PermissionTypeList;
  [PermissionTypeEnum.GROUPS]: PermissionTypeList;
  [PermissionTypeEnum.MODULES]: PermissionTypeList;
  [PermissionTypeEnum.COURSES]: PermissionTypeList;
  [PermissionTypeEnum.STATS]: PermissionTypeList;
}

export interface RolePermission {
  name: string;
  id: number;
  enabled: boolean;
}
