import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { t } from '@lingui/macro';

export const translatePermissionsEnum = (
  permissionType: PermissionTypeEnum,
  permission: PermissionEnum
) => {
  switch (permission) {
    case PermissionEnum.CREATE:
      if (permissionType === PermissionTypeEnum.MODULES) {
        return t`Créer un module`;
      }
      if (permissionType === PermissionTypeEnum.COURSES) {
        return t`Créer un parcours`;
      }
      return t`Ajouter`;
    case PermissionEnum.READ:
      if (permissionType === PermissionTypeEnum.PERSONALIZATION) {
        return t`Accéder`;
      }
      return t`Visualiser`;
    case PermissionEnum.UPDATE:
      return t`Modifier`;
    case PermissionEnum.DELETE:
      return t`Supprimer`;
    case PermissionEnum.CREATE_BULK:
      return t`Ajouter en masse`;
    case PermissionEnum.BLOCK_UNBLOCK:
      return t`Bloquer/Débloquer`;
    default:
      return '';
  }
};

export const translatePermissionsTypeEnum = (permissionType: PermissionTypeEnum) => {
  switch (permissionType) {
    case PermissionTypeEnum.APPLICANTS:
      return t`Étudiants`;
    case PermissionTypeEnum.COURSES:
      return t`Parcours`;
    case PermissionTypeEnum.GROUPS:
      return t`Groupes`;
    case PermissionTypeEnum.MODULES:
      return t`Modules`;
    case PermissionTypeEnum.PERSONALIZATION:
      return t`Personnalisation`;
    case PermissionTypeEnum.ROLES:
      return t`Rôles`;
    case PermissionTypeEnum.STATS:
      return t`Statistiques`;
    case PermissionTypeEnum.TESTERS:
      return t`Testeurs externes`;
    case PermissionTypeEnum.USERS:
      return t`Utilisateurs`;
    default:
      return '';
  }
};
