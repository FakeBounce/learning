import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import ActionButton from '@src/components/lms/ActionButton.tsx';

export default function UsersListHeader() {
  // const navigate = useNavigate();

  return (
    <Box px={3} height="10vh" display="flex" alignItems="center" position="sticky">
      <Typography variant="h5">
        <Trans>Utilisateurs</Trans>
      </Typography>
      <ActionButton
        sx={{ textTransform: 'none', ml: 2 }}
        onClick={() => {
          //TODO: Décommenter quand la page sera créée
          //navigate(PATH_USERS.add);
        }}
      >
        <Trans>Ajouter</Trans>
      </ActionButton>
      <ActionButton
        sx={{ textTransform: 'none', ml: 2 }}
        onClick={() => {
          //TODO: Décommenter quand la page sera créée
          //navigate(PATH_USERS.addMassive);
        }}
      >
        <Trans>Ajouter en masse</Trans>
      </ActionButton>
    </Box>
  );
}
