import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function RolesListHeader() {
  const navigate = useNavigate();

  return (
    <Box px={3} minHeight="10vh" display="flex" alignItems="center" boxSizing="border-box">
      <Typography variant="h4" fontWeight="normal">
        <Trans>Rôles</Trans>
      </Typography>
      <ActionButton
        sx={{ textTransform: 'none', ml: 2 }}
        onClick={() => {
          navigate(PATH_ORGANIZATIONS.add);
        }}
      >
        <Trans>Ajouter</Trans>
      </ActionButton>
    </Box>
  );
}
