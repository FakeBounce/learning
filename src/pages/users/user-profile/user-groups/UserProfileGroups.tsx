import { Box, Typography } from '@mui/material';
import FullTable from '@src/components/table/FullTable';
import {
  userProfileGroupsColumns,
  userProfileGroupsHeaderRender,
  userProfileGroupsRowRender
} from '@src/pages/users/user-profile/user-groups/UserProfileGroupsColumns';
import { Group } from '@services/groups/interfaces';
import { LMSCard } from '@src/components/lms';
import { useTheme } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';

interface UserProfileGroupsProps {
  groups: Group[]
}

export default function UserProfileGroups({groups}: UserProfileGroupsProps) {
  const theme = useTheme();
  const { singleUserLoading } = useAppSelector(
    (state) => state.users.singleUser
  );

  return (
    <Box px={[0, 2]} marginY={3} width="100%">
      <Typography
        sx={{
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.fontWeightRegular,
          marginBottom: 3
        }}
      >
        <Trans>Groupes</Trans>
      </Typography>
      {
       groups.length > 0 ?
         <LMSCard isPageCard cardCss={{ position: 'relative' }}>
           <FullTable
             headerRenderer={userProfileGroupsHeaderRender()}
             bodyRenderer={userProfileGroupsRowRender(groups)}
             isLoading={singleUserLoading}
             rowsNum={5}
             colsNum={userProfileGroupsColumns.length}
           />
         </LMSCard>
         :
         <Typography>
           <Trans>Aucun groupe défini.</Trans>
         </Typography>
      }
    </Box>
  );
}