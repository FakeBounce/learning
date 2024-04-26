import { PermissionTypeEnum } from '@services/permissions/interfaces';

export const pageRestrictionsList = {
  roles: [PermissionTypeEnum.ROLES],
  organizations: [PermissionTypeEnum.SUPER_ADMIN],
  groups: [PermissionTypeEnum.GROUPS],
  users: [PermissionTypeEnum.USERS],
  applicants: [PermissionTypeEnum.SUPER_ADMIN, PermissionTypeEnum.APPLICANTS],
  externalTesters: [PermissionTypeEnum.SUPER_ADMIN, PermissionTypeEnum.TESTERS],
  customize: [PermissionTypeEnum.PERSONALIZATION],
  modules: [PermissionTypeEnum.MODULES]
};
