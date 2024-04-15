import { Trans } from '@lingui/macro';
import { generatePath, useNavigate } from 'react-router-dom';
import CardHeader from '@src/components/cards/CardHeader';
import { useAppSelector } from '@redux/hooks';
import { useTheme } from '@mui/material/styles';
import { Box, Skeleton } from '@mui/material';
import { PATH_USERS } from '@utils/navigation/paths';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

export default function UserProfileHeader() {
  const { singleUserData, singleUserLoading } = useAppSelector((state) => state.users.singleUser);

  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const navigateToEdit = () => {
    if (singleUserData === null) return;
    navigate(generatePath(PATH_USERS.update, { userId: String(singleUserData.id) }));
  };

  const displayName = () => {
    if (!singleUserLoading && singleUserData !== null) {
      return (
        <>
          <Box component="span" sx={{ textTransform: 'uppercase' }}>
            {singleUserData.lastname}
          </Box>{' '}
          {singleUserData.firstname}
        </>
      );
    }
    return <Skeleton animation="pulse" variant="text" width="30%" />;
  };

  const userHeaderActions = () => {
    const canUpdateUser = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);
    if (canUpdateUser) {
      return [
        {
          action: navigateToEdit,
          actionText: <Trans>Modifier</Trans>,
          actionType: 'update' as const
        }
      ];
    }
    return null;
  };

  // @Todo might need to check the permisisons
  return (
    <CardHeader
      headerText={displayName()}
      headerColor={theme.palette.secondary.main}
      actions={userHeaderActions()}
    />
  );
}
