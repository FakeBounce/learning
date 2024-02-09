import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths.ts';
import { useNavigate } from 'react-router-dom';

export default function OrganisationsCreateFooter() {
  const navigate = useNavigate();

  const { organisationCreateLoading } = useAppSelector(
    (state) => state.organisations.organisationCreate
  );

  return (
    <Box display="flex">
      <ActionButton
        actionType="cancel"
        loading={organisationCreateLoading}
        onClick={() => navigate(PATH_ORGANISATIONS.root)}
      >
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" sx={{ ml: 2 }} loading={organisationCreateLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}
