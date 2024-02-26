import { Box, Typography } from '@mui/material';
import FullTable from '@src/components/table/FullTable.tsx';
import { LMSCard } from '@src/components/lms';
import { Role } from '@services/roles/interfaces.ts';
import {
  userProfileRolesColumns,
  userProfileRolesHeaderRender,
  userProfileRolesRowRender
} from '@src/pages/users/user-profile/user-roles/UserProfileRolesColumn.tsx';

interface UserProfileRolesProps {
  roles: Role[]
}

export default function UserProfileRoles({roles}: UserProfileRolesProps) {

  return (
    <Box px={[0, 2]} marginY={3} width="100%">
      <Typography
        sx={{
          fontSize: 24,
        }}
      >
        Rôles
      </Typography>
      <br/>
      {
        roles.length > 0 ?
          <LMSCard isPageCard cardCss={{ position: 'relative' }}>
            <FullTable
              headerRenderer={userProfileRolesHeaderRender()}
              bodyRenderer={userProfileRolesRowRender(roles)}
              isLoading={false}
              rowsNum={5}
              colsNum={userProfileRolesColumns.length}
            />
          </LMSCard>
          :
          <Typography>Aucun rôle défini.</Typography>
      }
    </Box>
  );
}