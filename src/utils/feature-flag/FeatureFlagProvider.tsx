import { ReactNode, useState, createContext, useEffect, useCallback } from 'react';
import {
  PermissionEnum,
  PermissionKey,
  PermissionTypeEnum,
  UserPermission
} from '@services/permissions/interfaces';
import { useAppSelector } from '@redux/hooks';

enum HasAdminRights {
  NO = 0,
  CLIENT_ADMIN = 1,
  SUPER_ADMIN = 2
}

type UserPermissionObject = {
  [key in PermissionKey]: boolean;
};

const constructPermissionsObject = () => {
  const permissionsObject: UserPermissionObject = {} as UserPermissionObject;
  Object.values(PermissionTypeEnum).forEach((typeEnum) => {
    Object.values(PermissionEnum).forEach((permEnum) => {
      const key = `${permEnum}_${typeEnum}`;
      permissionsObject[key as PermissionKey] = false;
    });
  });
  return permissionsObject;
};

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
  const [permissionsObject, setPermissionsObject] = useState<UserPermissionObject>(
    constructPermissionsObject()
  );
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

  useEffect(() => {
    if (permissions && permissions.length > 0) {
      const newPermissionsObject = constructPermissionsObject();
      permissions.forEach((permission: UserPermission) => {
        newPermissionsObject[permission.name] = true;
      });
      setPermissionsObject(newPermissionsObject);
    }
  }, [permissions]);

  const isAuthorizedByPermissionsTo = useCallback(
    (pageType: PermissionTypeEnum, permissionAsked: PermissionEnum): boolean => {
      if (isUserAdmin) {
        return true;
      }

      return permissionsObject[`${permissionAsked}_${pageType}`];
    },
    [permissions, permissionsObject, isUserAdmin]
  );

  const pagePermissionCheck = useCallback(
    (pageAskedPermission: PermissionTypeEnum) => {
      if (
        currentOrganization &&
        currentOrganization.isMain &&
        pageAskedPermission !== PermissionTypeEnum.SUPER_ADMIN
      ) {
        return false;
      }
      if (pageAskedPermission === PermissionTypeEnum.SUPER_ADMIN) {
        return (
          isUserAdmin === HasAdminRights.SUPER_ADMIN &&
          currentOrganization &&
          currentOrganization.isMain
        );
      }
      return isAuthorizedByPermissionsTo(pageAskedPermission, PermissionEnum.READ);
    },
    [currentOrganization, isUserAdmin, isAuthorizedByPermissionsTo]
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
