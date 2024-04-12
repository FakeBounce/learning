import { Trans } from '@lingui/macro';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import CardHeader from '@src/components/cards/CardHeader';
import { useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';

export default function GroupsListHeader() {
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);
  const navigate = useNavigate();

  const canCreateGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);

  const goToGroupsCreate = () => {
    navigate(PATH_GROUPS.add);
  };

  const applicantsListHeaderAction = canCreateGroup
    ? [{ action: goToGroupsCreate, actionText: <Trans>Ajouter</Trans> }]
    : null;

  return <CardHeader headerText={<Trans>Groupes</Trans>} actions={applicantsListHeaderAction} />;
}
