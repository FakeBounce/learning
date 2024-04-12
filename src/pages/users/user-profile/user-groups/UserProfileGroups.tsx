import { Box, Typography } from '@mui/material';
import { userProfileGroupsColumns } from '@src/pages/users/user-profile/user-groups/UserProfileGroupsColumns';
import { Group } from '@services/groups/interfaces';
import { LMSCard } from '@src/components/lms';
import { useTheme } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import SimpleTable from '@src/components/table/SimpleTable';

interface UserProfileGroupsProps {
  groups: Group[];
}

export default function UserProfileGroups({ groups = [] }: UserProfileGroupsProps) {
  const theme = useTheme();
  const { singleUserLoading } = useAppSelector((state) => state.users.singleUser);

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Box px={[0, 4]} width="100%">
        <Typography
          sx={{
            fontSize: theme.typography.h3.fontSize,
            fontWeight: theme.typography.fontWeightRegular
          }}
        >
          <Trans>Groupes</Trans>
        </Typography>
      </Box>
      {groups.length > 0 ? (
        <LMSCard isPageCard canExpand contentPadding={0}>
          <SimpleTable
            columns={userProfileGroupsColumns()}
            rows={groups}
            loading={singleUserLoading}
          />
        </LMSCard>
      ) : (
        <Typography>
          <Trans>Aucun groupe défini.</Trans>
        </Typography>
      )}
    </Box>
  );
}
