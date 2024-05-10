import { Box, Typography } from '@mui/material';
import { userProfileGroupsColumns } from '@src/pages/users/users-profile/users-groups/UserProfileGroupsColumns';
import { LMSCard } from '@src/components/lms';
import { useTheme } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import SimpleTable from '@src/components/table/SimpleTable';
import { MIN_HEIGHT_FULL_TABLE } from '@utils/globalConsts';

export default function ApplicantsProfileGroups() {
  const theme = useTheme();
  const { applicantProfileData, applicantProfileLoading } = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  const hasGroups =
    applicantProfileData && applicantProfileData.groups && applicantProfileData.groups.length > 0;

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Box px={[0, 4]} width="100%">
        <Typography
          sx={{
            fontSize: theme.typography.h3.fontSize,
            fontWeight: theme.typography.fontWeightRegular
          }}
        >
          <Trans>Groupe(s)</Trans>
        </Typography>
      </Box>
      <LMSCard isPageCard canExpand contentPadding={0}>
        <SimpleTable
          columns={userProfileGroupsColumns()}
          rows={hasGroups ? applicantProfileData.groups : []}
          loading={applicantProfileLoading}
          sx={{
            '.MuiDataGrid-virtualScroller': {
              overflowY: 'scroll !important',
              minHeight: MIN_HEIGHT_FULL_TABLE / 2
            }
          }}
        />
      </LMSCard>
    </Box>
  );
}
