import '@mui/system/createTheme/shapes';

declare module '@mui/system/createTheme/shape' {
  interface Shape {
    borderRadius: number;
    customBorderRadius: {
      small: number;
      medium: number;
      large: number;
      whole: number;
    };
  }
}