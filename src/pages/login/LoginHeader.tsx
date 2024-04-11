import { Trans } from '@lingui/macro';
import { Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Theme } from '@mui/material/styles';

export default function LoginHeader() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={(theme) => theme.typography.fontWeightMedium}
        fontSize={(theme) => theme.typography.h3.fontSize}
      >
        <Trans>Connexion</Trans>
      </Typography>
      <Box display="flex" flexDirection={['column', 'row']} mb={4}>
        <Typography fontSize={(theme) => theme.typography.body1.fontSize}>
          <Trans>Pas encore de compte ?</Trans>
        </Typography>
        <Typography
          ml={[0, 1]}
          fontWeight={(theme) => theme.typography.fontWeightBold}
          fontSize={(theme) => theme.typography.body1.fontSize}
          color={(theme) => theme.palette.primary.dark}
        >
          <Box
            component={NavLink}
            to="/register"
            sx={{ color: (theme: Theme) => theme.palette.primary.dark }}
          >
            <Trans>Créer un compte</Trans>
          </Box>
        </Typography>
      </Box>
    </>
  );
}
