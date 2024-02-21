import { Trans } from '@lingui/macro';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export default function LoginHeader() {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={theme.typography.fontWeightMedium}
        fontSize={theme.typography.h3.fontSize}
      >
        <Trans>Connexion</Trans>
      </Typography>
      <Box display="flex" flexDirection={['column', 'row']} mb={4}>
        <Typography fontSize={theme.typography.body1.fontSize}>
          <Trans>Pas encore de compte ?</Trans>
        </Typography>
        <Typography
          ml={[0, 1]}
          fontWeight={theme.typography.fontWeightBold}
          fontSize={theme.typography.body1.fontSize}
          color={theme.palette.primary.dark}
        >
          <NavLink to="/register" style={{ color: theme.palette.primary.dark }}>
            <Trans>Créer un compte</Trans>
          </NavLink>
        </Typography>
      </Box>
    </>
  );
}
