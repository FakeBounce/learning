import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Shadows } from '@mui/material/styles/shadows';
import { ReactNode, useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider
} from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import GlobalStyles from './globalStyles';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeOptions = useMemo(
    () => ({
      palette: palette(),
      typography: typography as TypographyOptions,
      shape: {
        borderRadius: 4,
        customBorderRadius: {
          small: 2,
          medium: 4,
          large: 8,
          whole: 9999
        }
      },
      shadows: shadows() as Shadows
    }),
    []
  );

  const theme = createTheme(themeOptions);

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
