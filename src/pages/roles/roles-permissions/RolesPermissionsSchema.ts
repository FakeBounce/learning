import {
  PermissionEnum,
  PermissionKey,
  PermissionTypeEnum,
  UserPermissionObject
} from '@services/permissions/interfaces';
import { permissionsRestrictionList } from '@utils/feature-flag/RestrictionsList';
import * as Yup from 'yup';

// Define a helper function to create a default structure for each permission type
export const constructPermissionsObject = () => {
  const permissionsObject: UserPermissionObject = {} as UserPermissionObject;
  Object.values(PermissionTypeEnum).forEach((typeEnum) => {
    Object.values(PermissionEnum).forEach((permEnum) => {
      if (
        typeEnum === PermissionTypeEnum.SUPER_ADMIN ||
        typeEnum === PermissionTypeEnum.CLIENT_ADMIN
      ) {
        return;
      }
      if (!permissionsRestrictionList[typeEnum][permEnum]) {
        return;
      }
      const key = `${permEnum}_${typeEnum}`;
      permissionsObject[key as PermissionKey] = false;
    });
  });
  return permissionsObject;
};

// Helper function to generate permission keys
function generatePermissionKeys(): Record<string, Yup.BooleanSchema<boolean>> {
  const schemaFields: Record<string, Yup.BooleanSchema<boolean>> = {};

  Object.values(PermissionTypeEnum).forEach((type) => {
    // Skip the types that should not be iterated over
    if (type === PermissionTypeEnum.SUPER_ADMIN || type === PermissionTypeEnum.CLIENT_ADMIN) {
      return;
    }

    Object.values(PermissionEnum).forEach((permission) => {
      // Construct the permission key
      const key = `${permission}_${type}` as const;

      // Check if this key should be included based on the restrictions list
      if (permissionsRestrictionList[type]?.[permission]) {
        schemaFields[key] = Yup.boolean().required();
      }
    });
  });

  return schemaFields;
}

export const permissionsSchema = Yup.object().shape(generatePermissionKeys());
