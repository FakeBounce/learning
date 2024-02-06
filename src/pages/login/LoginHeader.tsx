import { Trans } from '@lingui/macro';
import { Typography, Box } from '@mui/material';
import theme from '@theme';
import { NavLink } from 'react-router-dom';

export default function LoginHeader() {
  return (
    <>
      <Typography
        variant="h5"
        fontWeight={theme.fonts.weight.medium}
        fontSize={theme.fonts.size.xxl}
      >
        <Trans>Connexion</Trans>
      </Typography>
      <Box display="flex" flexDirection={['column', 'row']} mb={4}>
        <Typography fontSize={theme.fonts.size.base}>
          <Trans>Pas encore de compte ?</Trans>
        </Typography>
        <Typography
          ml={[0, 1]}
          fontWeight={theme.fonts.weight.semibold}
          fontSize={theme.fonts.size.base}
          color={theme.palette.green[700]}
        >
          <NavLink to="/register" style={{ color: theme.palette.green[700] }}>
            <Trans>Créer un compte</Trans>
          </NavLink>
        </Typography>
      </Box>
    </>
  );
}
