import '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Theme {
    shape: {
      borderRadius: number;
      customBorderRadius: {
        small: number;
        medium: number;
        large: number;
        whole: number;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    shape: {
      borderRadius: number;
      customBorderRadius: {
        small: number;
        medium: number;
        large: number;
        whole: number;
      };
    };
  }
}