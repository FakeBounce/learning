import { LMSCard } from '@src/components/lms';
import UserProfileInfos from '@src/pages/users/users-profile/UserProfileInfos';
import UserProfileHeader from '@src/pages/users/users-profile/UserProfileHeader';
import UserProfileGroups from '@src/pages/users/users-profile/users-groups/UserProfileGroups';
import UserProfileRoles from '@src/pages/users/users-profile/users-roles/UserProfileRoles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleUser } from '@redux/actions/usersActions';
import { PATH_ERRORS } from '@utils/navigation/paths';
import { enqueueSnackbar } from 'notistack';
import { t } from '@lingui/macro';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { singleUserData } = useAppSelector((state) => state.users.singleUser);
  const { userId } = useParams();

  useEffect(() => {
    if (singleUserData?.id !== Number(userId)) {
      try {
        const userIdToFetch = Number(userId);
        if (!isNaN(userIdToFetch)) {
          dispatch(getSingleUser(userIdToFetch));
        } else {
          throw new Error();
        }
      } catch (_) {
        navigate(PATH_ERRORS.root);
        enqueueSnackbar(t`L'utilisateur n'existe pas`, { variant: 'error' });
      }
    }
  }, []);

  return (
    <LMSCard isPageCard contentPadding={0} header={<UserProfileHeader />}>
      <UserProfileInfos />

      <UserProfileGroups />

      <UserProfileRoles />
    </LMSCard>
  );
}
