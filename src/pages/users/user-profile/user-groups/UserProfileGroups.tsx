import { Box, Typography } from '@mui/material';
import FullTable from '@src/components/table/FullTable.tsx';
import {
  userProfileGroupsColumns,
  userProfileGroupsHeaderRender,
  userProfileGroupsRowRender
} from '@src/pages/users/user-profile/user-groups/UserProfileGroupsColumns.tsx';
import { Group } from '@services/groups/interfaces.ts';
import { LMSCard } from '@src/components/lms';

interface UserProfileGroupsProps {
  groups: Group[]
}

export default function UserProfileGroups({groups}: UserProfileGroupsProps) {

  return (
    <Box px={[0, 2]} marginY={3} width="100%">
      <Typography
        sx={{
          fontSize: 24,
        }}
      >
        Groupes
      </Typography>
      <br/>
      {
       groups.length > 0 ?
         <LMSCard isPageCard cardCss={{ position: 'relative' }}>
           <FullTable
             headerRenderer={userProfileGroupsHeaderRender()}
             bodyRenderer={userProfileGroupsRowRender(groups)}
             isLoading={false}
             rowsNum={5}
             colsNum={userProfileGroupsColumns.length}
           />
         </LMSCard>
         :
         <Typography>Aucun groupe défini.</Typography>
      }
    </Box>
  );
}