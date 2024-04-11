import { Trans } from '@lingui/macro';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@src/components/cards/CardHeader';

export default function OrganizationsListHeader() {
  const navigate = useNavigate();

  const navigateToAdd = () => {
    navigate(PATH_ORGANIZATIONS.add);
  };

  return (
    <CardHeader
      headerText={<Trans>Organisations</Trans>}
      actions={[
        {
          action: navigateToAdd,
          actionText: <Trans>Ajouter</Trans>
        }
      ]}
    />
  );
}
