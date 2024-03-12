export interface PermissionTypeList {
  [PermissionTypeEnum.PERSONALIZATION]?: Permission;
  [PermissionTypeEnum.USERS]?: Permission;
  [PermissionTypeEnum.TESTERS]?: Permission;
  [PermissionTypeEnum.STUDENTS]?: Permission;
  [PermissionTypeEnum.ROLES]?: Permission;
  [PermissionTypeEnum.GROUPS]?: Permission;
  [PermissionTypeEnum.MODULES]?: Permission;
  [PermissionTypeEnum.COURSES]?: Permission;
  [PermissionTypeEnum.STATS]?: Permission;
}

export interface Permission {
  title: string;
  actions: PermissionAction[];
}

export interface PermissionAction {
  name: PermissionEnum;
  id: number;
  enabled: boolean;
}

export enum PermissionEnum {
  CREATE = 'Créer',
  READ = 'Visualiser',
  UPDATE = 'Modifier',
  DELETE = 'Supprimer',
  ADD_BULK = 'Ajouter en masse',
  BLOCK_UNBLOCK = 'Bloquer/Débloquer'
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
  SUPER_ADMIN = 'super-admin',
  CLIENT_ADMIN = 'client-admin'
}
