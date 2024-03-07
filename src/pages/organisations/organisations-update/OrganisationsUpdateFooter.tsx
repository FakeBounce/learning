import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function OrganisationsUpdateFooter() {
  const navigate = useNavigate();

  const { organisationUpdateLoading } = useAppSelector(
    (state) => state.organisations.organisationUpdate.organisationUpdateLoading
  );

  return (
    <Box display="flex">
      <ActionButton
        actionType="cancel"
        loading={organisationUpdateLoading}
        onClick={() => navigate(PATH_ORGANISATIONS.root)}
      >
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" role="submit" sx={{ ml: 2 }} loading={organisationUpdateLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}
