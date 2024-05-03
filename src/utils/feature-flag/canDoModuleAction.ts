import {
  Module,
  ModulesActions,
  ModuleStatusEnum,
  ModuleUserRightEnum
} from '@services/modules/interfaces';
import { modulesRestrictionsList } from '@utils/feature-flag/RestrictionsList';

export const canDoModuleAction = (module: Module, action: ModulesActions) => {
  const status = module.status as ModuleStatusEnum;
  // @TODO Should search the user / right should be retrieved from the first keys
  // @todo Fix this type casting with API returns
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const userRight = module.rights.users[0].pivot.right as ModuleUserRightEnum;

  const statusActions = modulesRestrictionsList[status];
  if (!statusActions) {
    // If no actions are defined for this status, return false
    return false;
  }

  const actionPermissions = statusActions[action];
  if (!actionPermissions) {
    // If the action is not defined under this status, return false
    return false;
  }

  // Return the permission for the specific user right, default to false if not defined
  return actionPermissions[userRight] ?? false;
};
