import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import RolesPermissionsFormPermissionType from '@src/pages/roles/roles-permissions/RolesPermissionsFormPermissionType';
import RolesPermissionsFormPermissionsActions from '@src/pages/roles/roles-permissions/RolesPermissionsFormPermissionsActions';
import {
  translatePermissionsEnum,
  translatePermissionsTypeEnum
} from '@utils/helpers/translatePermissions';

const emptyBox = (
  <Box display={['none', 'none', 'flex']} flex={1} justifyContent="center" alignItems="center" />
);

export default function RolesPermissionsForm() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box
        bgcolor={(theme) => theme.palette.grey[300]}
        p={4}
        py={2}
        gap={1}
        display="flex"
        flexDirection="column"
      >
        <RolesPermissionsFormPermissionType title={<Trans>Activités</Trans>}>
          <>
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE}_${PermissionTypeEnum.COURSES}`}
              label={translatePermissionsEnum(PermissionTypeEnum.COURSES, PermissionEnum.CREATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE}_${PermissionTypeEnum.MODULES}`}
              label={translatePermissionsEnum(PermissionTypeEnum.MODULES, PermissionEnum.CREATE)}
            />
            {emptyBox}
            {emptyBox}
            {emptyBox}
          </>
        </RolesPermissionsFormPermissionType>

        <RolesPermissionsFormPermissionType
          title={translatePermissionsTypeEnum(PermissionTypeEnum.GROUPS)}
        >
          <>
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.READ}_${PermissionTypeEnum.GROUPS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.GROUPS, PermissionEnum.READ)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE}_${PermissionTypeEnum.GROUPS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.GROUPS, PermissionEnum.CREATE)}
            />
            {emptyBox}
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.UPDATE}_${PermissionTypeEnum.GROUPS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.GROUPS, PermissionEnum.UPDATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.DELETE}_${PermissionTypeEnum.GROUPS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.GROUPS, PermissionEnum.DELETE)}
            />
          </>
        </RolesPermissionsFormPermissionType>

        <RolesPermissionsFormPermissionType
          title={translatePermissionsTypeEnum(PermissionTypeEnum.USERS)}
        >
          <>
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.READ}_${PermissionTypeEnum.USERS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.USERS, PermissionEnum.READ)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE}_${PermissionTypeEnum.USERS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.USERS, PermissionEnum.CREATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE_BULK}_${PermissionTypeEnum.USERS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.USERS, PermissionEnum.CREATE_BULK)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.UPDATE}_${PermissionTypeEnum.USERS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.USERS, PermissionEnum.UPDATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.BLOCK_UNBLOCK}_${PermissionTypeEnum.USERS}`}
              label={translatePermissionsEnum(
                PermissionTypeEnum.USERS,
                PermissionEnum.BLOCK_UNBLOCK
              )}
            />
          </>
        </RolesPermissionsFormPermissionType>

        <RolesPermissionsFormPermissionType
          title={translatePermissionsTypeEnum(PermissionTypeEnum.APPLICANTS)}
        >
          <>
            {emptyBox}
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE}_${PermissionTypeEnum.APPLICANTS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.APPLICANTS, PermissionEnum.CREATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE_BULK}_${PermissionTypeEnum.APPLICANTS}`}
              label={translatePermissionsEnum(
                PermissionTypeEnum.APPLICANTS,
                PermissionEnum.CREATE_BULK
              )}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.UPDATE}_${PermissionTypeEnum.APPLICANTS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.APPLICANTS, PermissionEnum.UPDATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.BLOCK_UNBLOCK}_${PermissionTypeEnum.APPLICANTS}`}
              label={translatePermissionsEnum(
                PermissionTypeEnum.APPLICANTS,
                PermissionEnum.BLOCK_UNBLOCK
              )}
            />
          </>
        </RolesPermissionsFormPermissionType>
        <RolesPermissionsFormPermissionType
          title={translatePermissionsTypeEnum(PermissionTypeEnum.TESTERS)}
        >
          <>
            {emptyBox}
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE}_${PermissionTypeEnum.TESTERS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.TESTERS, PermissionEnum.CREATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE_BULK}_${PermissionTypeEnum.TESTERS}`}
              label={translatePermissionsEnum(
                PermissionTypeEnum.TESTERS,
                PermissionEnum.CREATE_BULK
              )}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.UPDATE}_${PermissionTypeEnum.TESTERS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.TESTERS, PermissionEnum.UPDATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.BLOCK_UNBLOCK}_${PermissionTypeEnum.TESTERS}`}
              label={translatePermissionsEnum(
                PermissionTypeEnum.TESTERS,
                PermissionEnum.BLOCK_UNBLOCK
              )}
            />
          </>
        </RolesPermissionsFormPermissionType>

        <RolesPermissionsFormPermissionType
          title={translatePermissionsTypeEnum(PermissionTypeEnum.ROLES)}
        >
          <>
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.READ}_${PermissionTypeEnum.ROLES}`}
              label={translatePermissionsEnum(PermissionTypeEnum.ROLES, PermissionEnum.READ)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.CREATE}_${PermissionTypeEnum.ROLES}`}
              label={translatePermissionsEnum(PermissionTypeEnum.ROLES, PermissionEnum.CREATE)}
            />
            {emptyBox}
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.UPDATE}_${PermissionTypeEnum.ROLES}`}
              label={translatePermissionsEnum(PermissionTypeEnum.ROLES, PermissionEnum.UPDATE)}
            />
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.DELETE}_${PermissionTypeEnum.ROLES}`}
              label={translatePermissionsEnum(PermissionTypeEnum.ROLES, PermissionEnum.DELETE)}
            />
          </>
        </RolesPermissionsFormPermissionType>

        <RolesPermissionsFormPermissionType
          title={translatePermissionsTypeEnum(PermissionTypeEnum.STATS)}
        >
          <>
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.READ}_${PermissionTypeEnum.STATS}`}
              label={translatePermissionsEnum(PermissionTypeEnum.STATS, PermissionEnum.READ)}
            />
            {emptyBox}
            {emptyBox}
            {emptyBox}
            {emptyBox}
          </>
        </RolesPermissionsFormPermissionType>
        <RolesPermissionsFormPermissionType
          title={translatePermissionsTypeEnum(PermissionTypeEnum.PERSONALIZATION)}
        >
          <>
            <RolesPermissionsFormPermissionsActions
              name={`${PermissionEnum.READ}_${PermissionTypeEnum.PERSONALIZATION}`}
              label={translatePermissionsEnum(
                PermissionTypeEnum.PERSONALIZATION,
                PermissionEnum.READ
              )}
            />
            {emptyBox}
            {emptyBox}
            {emptyBox}
            {emptyBox}
          </>
        </RolesPermissionsFormPermissionType>
      </Box>
    </Box>
  );
}
