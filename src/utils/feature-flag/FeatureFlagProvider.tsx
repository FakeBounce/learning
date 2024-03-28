import { ReactNode, useState, createContext, useEffect, useCallback } from 'react';
import {
  PermissionAction,
  PermissionEnum,
  PermissionTypeEnum
} from '@services/permissions/interfaces';
import { useAppSelector } from '@redux/hooks';

enum HasAdminRights {
  NO = 0,
  CLIENT_ADMIN = 1,
  SUPER_ADMIN = 2
}

export const FeatureFlagContext = createContext<{
  isAuthorizedByPermissionsTo: (
    pageType: PermissionTypeEnum,
    permissionAsked: PermissionEnum
  ) => boolean;
  canSeePage: (pageAsked: PermissionTypeEnum[]) => boolean;
}>({
  isAuthorizedByPermissionsTo: () => false,
  canSeePage: () => false
});

const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const [isUserAdmin, setIsUserAdmin] = useState<HasAdminRights>(HasAdminRights.NO);
  const { isSuperAdmin, isClientAdmin, permissions, currentOrganization } = useAppSelector(
    (state) => state.connectedUser.user
  );

  useEffect(() => {
    if (isSuperAdmin) {
      setIsUserAdmin(HasAdminRights.SUPER_ADMIN);
    } else if (isClientAdmin) {
      setIsUserAdmin(HasAdminRights.CLIENT_ADMIN);
    }
  }, [isSuperAdmin, isClientAdmin]);

  const isAuthorizedByPermissionsTo = useCallback(
    (pageType: PermissionTypeEnum, permissionAsked: PermissionEnum): boolean => {
      if (isUserAdmin) {
        return true;
      }
      if (permissions[pageType] && permissions[pageType].actions) {
        // If the permission asked is READ, we check if the permission exists in the array
        if (permissionAsked === PermissionEnum.READ) {
          const hasKeyIndex = permissions[pageType].actions.findIndex(
            (action: PermissionAction) => action.name === PermissionEnum.READ
          );
          if (hasKeyIndex !== -1) {
            return permissions[pageType].actions[hasKeyIndex].enabled;
          }
          // If the permission doesn't exist, that means everyone can visualize it
          return true;
        }
        return permissions[pageType].actions.some(
          (action: PermissionAction) => action.name === permissionAsked && action.enabled
        );
      }
      return false;
    },
    [permissions, isUserAdmin]
  );

  const pagePermissionCheck = useCallback(
    (pageAskedPermission: PermissionTypeEnum) => {
      if (currentOrganization.isMain && pageAskedPermission !== PermissionTypeEnum.SUPER_ADMIN) {
        return false;
      }
      if (pageAskedPermission === PermissionTypeEnum.SUPER_ADMIN) {
        return isUserAdmin === HasAdminRights.SUPER_ADMIN && currentOrganization.isMain;
      }
      return isAuthorizedByPermissionsTo(pageAskedPermission, PermissionEnum.READ);
    },
    [currentOrganization, isUserAdmin]
  );

  const canSeePage = (pageAsked: PermissionTypeEnum[]): boolean => {
    let hasPermission = false;
    pageAsked.forEach((page) => {
      if (pagePermissionCheck(page)) {
        hasPermission = true;
      }
    });
    return hasPermission;
  };

  return (
    <FeatureFlagContext.Provider
      value={{
        isAuthorizedByPermissionsTo,
        canSeePage
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
};

export { FeatureFlagProvider };
