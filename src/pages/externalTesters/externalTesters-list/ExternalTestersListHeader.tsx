import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function ExternalTestersListHeader() {
  const navigate = useNavigate();

  return (
    <Box px={3} minHeight="10vh" display="flex" alignItems="center" position="sticky">
      <Typography variant="h5">
        <Trans>Testeurs</Trans>
      </Typography>
      <ActionButton
        sx={{ textTransform: 'none', ml: 2 }}
        onClick={() => {
          navigate(PATH_EXTERNAL_TESTERS.add);
        }}
      >
        <Trans>Créer</Trans>
      </ActionButton>
    </Box>
  );
}
