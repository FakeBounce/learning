import { Box } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import UserProfileInfos from '@src/pages/users/user-profile/UserProfileInfos.tsx';
import UserProfileHeader from '@src/pages/users/user-profile/UserProfileHeader.tsx';
import UserProfileGroups from '@src/pages/users/user-profile/user-groups/UserProfileGroups.tsx';
import { useLocation } from 'react-router-dom';
import UserProfileRoles from '@src/pages/users/user-profile/user-roles/UserProfileRoles.tsx';

export default function UserProfile() {
  const { state } = useLocation();
  const { user } = state;

  return (
    <Box px={[0, 2]} display='flex' width="100%">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <UserProfileHeader user={user} />

        <UserProfileInfos user={user} />

        <UserProfileGroups groups={user.groups} />

        <UserProfileRoles roles={user.roles} />
      </LMSCard>
    </Box>
  );
}