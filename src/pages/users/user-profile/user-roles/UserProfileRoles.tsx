import { Box, Typography } from '@mui/material';
import FullTable from '@src/components/table/FullTable';
import { LMSCard } from '@src/components/lms';
import { UserRole } from '@services/roles/interfaces';
import {
  userProfileRolesColumns,
  userProfileRolesHeaderRender,
  userProfileRolesRowRender
} from '@src/pages/users/user-profile/user-roles/UserProfileRolesColumn';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@redux/hooks';

interface UserProfileRolesProps {
  roles: UserRole[];
}

export default function UserProfileRoles({ roles }: UserProfileRolesProps) {
  const theme = useTheme();

  const { singleUserLoading } = useAppSelector((state) => state.users.singleUser);

  return (
    <Box px={[0, 2]} marginY={3} width="100%" boxSizing="border-box">
      <Typography
        sx={{
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.fontWeightRegular,
          marginBottom: 3
        }}
      >
        <Trans>Rôles</Trans>
      </Typography>
      {roles.length > 0 ? (
        <LMSCard isPageCard cardCss={{ position: 'relative' }}>
          <FullTable
            headerRenderer={userProfileRolesHeaderRender()}
            bodyRenderer={userProfileRolesRowRender(roles)}
            isLoading={singleUserLoading}
            rowsNum={5}
            colsNum={userProfileRolesColumns.length}
          />
        </LMSCard>
      ) : (
        <Typography>
          <Trans>Aucun rôle défini.</Trans>
        </Typography>
      )}
    </Box>
  );
}
