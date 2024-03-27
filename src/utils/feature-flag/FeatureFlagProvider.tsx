import { ReactNode, useState, createContext, useEffect } from 'react';
import {
  PermissionAction,
  PermissionEnum,
  PermissionTypeEnum
} from '@services/permissions/interfaces';
import { useAppSelector } from '@redux/hooks';
import { UserRole } from '@services/roles/interfaces';

enum HasAdminRights {
  NO = 0,
  CLIENT_ADMIN = 1,
  SUPER_ADMIN = 2
}

export const FeatureFlagContext = createContext<{
  isAuthorizedByPermissionsTo: (
    permissionType: PermissionTypeEnum,
    permissionAsked: PermissionEnum
  ) => boolean;
  canSeePage: (pageAsked: PermissionTypeEnum[]) => boolean;
}>({
  isAuthorizedByPermissionsTo: () => false,
  canSeePage: () => false
});

const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const [isUserAdmin, setIsUserAdmin] = useState<HasAdminRights>(HasAdminRights.SUPER_ADMIN);
  const { permissions, user } = useAppSelector((state) => state.connectedUser);

  useEffect(() => {
    if (user && user.roles) {
      // Browse roles to see if the user is super-admin
      user.roles.find((role: UserRole) => {
        if (role.name === PermissionTypeEnum.CLIENT_ADMIN) {
          setIsUserAdmin(HasAdminRights.CLIENT_ADMIN);
        } else if (role.name === PermissionTypeEnum.SUPER_ADMIN) {
          setIsUserAdmin(HasAdminRights.SUPER_ADMIN);
        }
      });
    }
  }, [user]);

  const isAuthorizedByPermissionsTo = (
    permissionType: PermissionTypeEnum,
    permissionAsked: PermissionEnum
  ): boolean => {
    if (isUserAdmin) {
      return true;
    }
    if (permissions[permissionType] && permissions[permissionType].actions) {
      return permissions[permissionType].actions.some(
        (action: PermissionAction) => action.name === permissionAsked && action.enabled
      );
    }
    return false;
  };

  // @Todo : Might not the correct method cause there is doubt about how permissions works
  const canSeePage = (pageAsked: PermissionTypeEnum[]): boolean => {
    let hasPermission = false;
    pageAsked.forEach((page) => {
      if (pagePermissionCheck(page)) {
        hasPermission = true;
      }
    });
    return hasPermission;
  };

  const pagePermissionCheck = (pageAskedPermission: PermissionTypeEnum) => {
    // @Todo : Unless we are on main organization, in which case we can only see SUPER_ADMIN pages
    if (user.organizationId === 1 && pageAskedPermission !== PermissionTypeEnum.SUPER_ADMIN) {
      return false;
    }
    if (pageAskedPermission === PermissionTypeEnum.SUPER_ADMIN) {
      return isUserAdmin === HasAdminRights.SUPER_ADMIN && user.organizationId === 1;
    }
    if (isUserAdmin >= HasAdminRights.CLIENT_ADMIN) {
      return true;
    }
    return Object.prototype.hasOwnProperty.call(permissions, pageAskedPermission);
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
