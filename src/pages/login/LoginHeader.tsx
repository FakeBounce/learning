// @mui
import { Typography, Box } from '@mui/material';
import { useLocales } from '@src/locales';
import theme from '@theme';
import { NavLink } from 'react-router-dom';
// login

// ----------------------------------------------------------------------

export default function LoginHeader() {
  const { translate } = useLocales();

  return (
    <>
      <Typography
        variant="h5"
        fontWeight={theme.fonts.weight.medium}
        fontSize={theme.fonts.size.xxl}
      >
        {translate('LOGIN_TITLE')}
      </Typography>
      <Box display="flex" mb={4}>
        <Typography fontSize={theme.fonts.size.base}>
          {translate('LOGIN_NO_ACCOUNT_YET')}
        </Typography>
        <Typography
          ml={1}
          fontWeight={theme.fonts.weight.semibold}
          fontSize={theme.fonts.size.base}
          color={theme.palette.green[700]}
        >
          <NavLink to="/register" style={{ color: theme.palette.green[700] }}>
            {translate('LOGIN_CREATE_ACCOUNT')}
          </NavLink>
        </Typography>
      </Box>
    </>
  );
}
