import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function OrganizationsListHeader() {
  const navigate = useNavigate();

  return (
    <Box px={3} height="10vh" display="flex" alignItems="center" position="sticky">
      <Typography variant="h5">
        <Trans>Organizations</Trans>
      </Typography>
      <ActionButton
        sx={{ textTransform: 'none', ml: 2 }}
        onClick={() => {
          navigate(PATH_ORGANIZATIONS.add);
        }}
      >
        <Trans>Créer</Trans>
      </ActionButton>
    </Box>
  );
}
