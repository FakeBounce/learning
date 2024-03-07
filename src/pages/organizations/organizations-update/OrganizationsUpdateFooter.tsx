import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function OrganizationsUpdateFooter() {
  const navigate = useNavigate();

  const { organizationUpdateLoading } = useAppSelector(
    (state) => state.organizations.organizationUpdate.organizationUpdateLoading
  );

  return (
    <Box display="flex">
      <ActionButton
        actionType="cancel"
        loading={organizationUpdateLoading}
        onClick={() => navigate(PATH_ORGANIZATIONS.root)}
      >
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" role="submit" sx={{ ml: 2 }} loading={organisationUpdateLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}
