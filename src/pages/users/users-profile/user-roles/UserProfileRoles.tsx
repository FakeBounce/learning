import { Box, Typography } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import { userProfileRolesColumns } from '@src/pages/users/users-profile/user-roles/UserProfileRolesColumn';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@redux/hooks';
import SimpleTable from '@src/components/table/SimpleTable';

export default function UserProfileRoles() {
  const theme = useTheme();

  const { singleUserData, singleUserLoading } = useAppSelector((state) => state.users.singleUser);

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Box px={[0, 4]} width="100%" boxSizing="border-box">
        <Typography
          sx={{
            fontSize: theme.typography.h3.fontSize,
            fontWeight: theme.typography.fontWeightRegular
          }}
        >
          <Trans>Rôles</Trans>
        </Typography>
      </Box>
      {singleUserData && singleUserData.roles.length > 0 ? (
        <LMSCard isPageCard canExpand contentPadding={0}>
          <SimpleTable
            columns={userProfileRolesColumns()}
            rows={singleUserData.roles}
            loading={singleUserLoading}
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
