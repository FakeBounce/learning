import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function OrganizationsCreateFooter() {
  const navigate = useNavigate();

  const { organizationCreateLoading } = useAppSelector(
    (state) => state.organizations.organizationCreate
  );

  return (
    <Box display="flex">
      <ActionButton
        actionType="cancel"
        loading={organizationCreateLoading}
        onClick={() => navigate(PATH_ORGANIZATIONS.root)}
      >
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" sx={{ ml: 2 }} loading={organizationCreateLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}
