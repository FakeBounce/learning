import { Trans } from '@lingui/macro';
import { PATH_ROLES } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import CardHeader from '@src/components/cards/CardHeader';

export default function RolesListHeader() {
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canCreateRole = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);
  const goToCreateRole = () => {
    navigate(PATH_ROLES.add);
  };

  const rolesListHeaderActions = canCreateRole
    ? [{ action: goToCreateRole, actionText: <Trans>Ajouter</Trans> }]
    : null;

  return <CardHeader headerText={<Trans>Rôles</Trans>} actions={rolesListHeaderActions} />;
}
