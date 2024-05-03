import { PermissionTypeEnum } from '@services/permissions/interfaces';
import {
  ModulesActions,
  ModuleStatusEnum,
  ModuleUserRightEnum
} from '@services/modules/interfaces';

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

// Type for the permissions for each action within a status
type ActionPermissions = {
  [key in ModuleUserRightEnum]: boolean;
};

// Type for the actions available under a particular module status
type ModuleActions = {
  [action in ModulesActions]?: ActionPermissions;
};

// Type for all module restrictions across statuses
type ModuleRestrictions = {
  [status in ModuleStatusEnum]: ModuleActions;
};

export const modulesRestrictionsList: ModuleRestrictions = {
  [ModuleStatusEnum.ARCHIVED]: {
    [ModulesActions.SEE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: true
    },
    [ModulesActions.DASHBOARD]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: true
    },
    [ModulesActions.DUPLICATE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: false
    }
  },
  [ModuleStatusEnum.DRAFT]: {
    [ModulesActions.SEE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.SHARE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.TRY]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.EDIT]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.DELETE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.LOCK_UNLOCK]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: false,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    }
  },
  [ModuleStatusEnum.IN_CORRECTION]: {
    [ModulesActions.SEE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.SHARE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.TRY]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.EDIT]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.CANCEL]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.LOCK_UNLOCK]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: false,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    }
  },
  [ModuleStatusEnum.PUBLISHED]: {
    [ModulesActions.SEE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: true
    },
    [ModulesActions.DASHBOARD]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: true
    },
    [ModulesActions.SEND]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.SHARE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.TRY]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.DUPLICATE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: true,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.NEW_VERSION]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: true,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.ARCHIVE]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: false,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    },
    [ModulesActions.LOCK_UNLOCK]: {
      [ModuleUserRightEnum.OWNER]: true,
      [ModuleUserRightEnum.CONTRIBUTOR]: false,
      [ModuleUserRightEnum.SUPERVISOR]: false,
      [ModuleUserRightEnum.VIEWER]: false
    }
  }
};
