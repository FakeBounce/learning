import { Box } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import UserProfileInfos from '@src/pages/users/user-profile/UserProfileInfos';
import UserProfileHeader from '@src/pages/users/user-profile/UserProfileHeader';
import UserProfileGroups from '@src/pages/users/user-profile/user-groups/UserProfileGroups';
import UserProfileRoles from '@src/pages/users/user-profile/user-roles/UserProfileRoles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSingleUser } from '@redux/reducers/usersReducer';
import { User } from '@services/users/interfaces';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>({} as User);

  const { singleUserData } = useAppSelector((state) => state.users.singleUser);
  const { pathname } = useLocation();
  const userId = Number(pathname.split('/').pop());

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUser(userId));
    }
  }, []);

  useEffect(() => {
    if (singleUserData) {
      setUser(singleUserData);
    }
  }, [singleUserData]);

  return (
    <Box px={[0, 2]} display="flex" width="100%">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <UserProfileHeader user={user} />

        <UserProfileInfos user={user} />

        <UserProfileGroups groups={user.groups ?? []} />

        <UserProfileRoles roles={user.roles ?? []} />
      </LMSCard>
    </Box>
  );
}
