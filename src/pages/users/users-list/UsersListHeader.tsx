import { Trans } from '@lingui/macro';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { useNavigate } from 'react-router-dom';
import { PATH_USERS } from '@utils/navigation/paths';
import CardHeader from '@src/components/cards/CardHeader';

export default function UsersListHeader() {
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canCreateUser = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);
  const canCreateBulkUser = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE_BULK);

  const goToCreateUser = () => {
    navigate(PATH_USERS.add);
  };
  const goToCreateBulkUser = () => {
    navigate(PATH_USERS.addBulk);
  };

  const usersListHeaderActions = () => {
    const actionsArray = [];
    if (canCreateUser) {
      actionsArray.push({
        action: goToCreateUser,
        actionText: <Trans>Ajouter</Trans>
      });
    }
    if (canCreateBulkUser) {
      actionsArray.push({
        action: goToCreateBulkUser,
        actionText: <Trans>Ajouter en masse</Trans>
      });
    }

    return actionsArray;
  };

  return <CardHeader headerText={<Trans>Utilisateurs</Trans>} actions={usersListHeaderActions()} />;
}
