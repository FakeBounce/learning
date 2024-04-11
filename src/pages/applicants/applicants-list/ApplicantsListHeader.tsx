import { Trans } from '@lingui/macro';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import CardHeader from '@src/components/cards/CardHeader';

export default function ApplicantsListHeader() {
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canCreateApplicant = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);

  const goToApplicantsCreate = () => {
    navigate(PATH_APPLICANTS.add);
  };

  const applicantsListHeaderActions = canCreateApplicant
    ? [{ action: goToApplicantsCreate, actionText: <Trans>Ajouter</Trans> }]
    : null;

  return <CardHeader headerText={<Trans>Étudiants</Trans>} actions={applicantsListHeaderActions} />;
}
