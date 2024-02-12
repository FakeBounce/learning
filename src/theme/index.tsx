import PropTypes from 'prop-types';
import { ReactNode, useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider
} from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import GlobalStyles from './globalStyles';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeOptions = useMemo(
    () => ({
      palette: palette(),
      typography,
      shape: { borderRadius: 8 },
      shadows: shadows()
    }),
    []
  );

  const theme = createTheme(themeOptions as any);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
