import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function OrganisationsListHeader() {
  const navigate = useNavigate();

  return (
    <Box
      px={3}
      height="10vh"
      display="flex"
      alignItems="center"
      position="sticky"
    >
      <Typography variant="h5">
        <Trans>Organisations</Trans>
      </Typography>
      <ActionButton
        sx={{ textTransform: 'none', ml: 2 }}
        onClick={() => {
          navigate(PATH_ORGANISATIONS.add);
        }}
      >
        <Trans>Créer</Trans>
      </ActionButton>
    </Box>
  );
}
