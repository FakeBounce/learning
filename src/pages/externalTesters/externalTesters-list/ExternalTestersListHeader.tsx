import { Trans } from '@lingui/macro';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@src/components/cards/CardHeader';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

export default function ExternalTestersListHeader() {
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canCreateExternalTester = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);
  const canCreateBulkExternalTester = isAuthorizedByPermissionsTo(
    pageType,
    PermissionEnum.CREATE_BULK
  );

  const goToCreateExternalTester = () => {
    navigate(PATH_EXTERNAL_TESTERS.add);
  };
  const goToCreateBulkExternalTester = () => {
    navigate(PATH_EXTERNAL_TESTERS.addBulk);
  };

  const applicantsListHeaderActions = () => {
    const actionsArray = [];
    if (canCreateExternalTester) {
      actionsArray.push({ action: goToCreateExternalTester, actionText: <Trans>Ajouter</Trans> });
    }
    if (canCreateBulkExternalTester) {
      actionsArray.push({
        action: goToCreateBulkExternalTester,
        actionText: <Trans>Ajouter en masse</Trans>
      });
    }
    return actionsArray;
  };

  return (
    <CardHeader headerText={<Trans>Testeurs</Trans>} actions={applicantsListHeaderActions()} />
  );
}
