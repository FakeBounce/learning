import { Trans } from '@lingui/macro';
import { PATH_MODULES } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import CardHeader from '@src/components/cards/CardHeader';
import { useTheme } from '@mui/material/styles';

export default function ModulesListHeader() {
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);
  const theme = useTheme();

  const canCreateRole = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);
  const goToCreateModule = () => {
    navigate(PATH_MODULES.add);
  };

  const modulesListHeaderActions = canCreateRole
    ? [{ action: goToCreateModule, actionText: <Trans>Créer un module</Trans> }]
    : null;

  return (
    <CardHeader
      headerText={<Trans>Modules</Trans>}
      headerColor={theme.palette.secondary.main}
      actions={modulesListHeaderActions}
    />
  );
}
