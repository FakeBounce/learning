import ActionButton from '@src/components/lms/ActionButton.tsx';
import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function UserEditFooter() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box display="flex">
      <ActionButton
        sx={{
          bgcolor: theme.palette.grey[400],
          '&:hover': {
            bgcolor: theme.palette.grey[600]
          },
        }}
        onClick={() => navigate(-1)}
      >
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton
        type="submit"
        sx={{
          bgcolor: theme.palette.primary.main,
          '&:hover': {
            bgcolor: theme.palette.primary.dark
          },
          marginX: 2,
        }}
      >
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}