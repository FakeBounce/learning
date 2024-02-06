export const theme: ThemeProps = {
  palette: {
    purple: {
      50: '#EBE5FF',
      100: '#C7B7FF',
      200: '#A38AFF',
      300: '#7F5CFF',
      400: '#5B2EFF',
      500: '#3700FF',
      600: '#2E00D6',
      700: '#2600AD',
      800: '#1D0085',
      900: '#14005C'
    },
    pink: {
      // 50: '#FFF3FE',
      // 100: '#FFDFFD',
      // 200: '#FFCBFC',
      // 300: '#FAAAF5',
      // 400: '#F291EC',
      500: '#FF6286'
      // 600: '#D652CD',
      // 700: '#BD2CB3',
      // 800: '#9E0D94',
      // 900: '#7E0076'
    },
    // red: {
    //   50: '#FEF2F2',
    //   100: '#FEE2E2',
    //   200: '#FECACA',
    //   300: '#FCA5A5',
    //   400: '#F87171',
    //   500: '#EF4444',
    //   600: '#DC2626',
    //   700: '#B91C1C',
    //   800: '#991B1B',
    //   900: '#7F1D1D'
    // },
    // orange: {
    //   50: '#FFF5E9',
    //   100: '#FFEDD5',
    //   200: '#FED7AA',
    //   300: '#FDBA74',
    //   400: '#FB923C',
    //   500: '#F97316',
    //   600: '#EA580C',
    //   700: '#C2410C',
    //   800: '#9A3412',
    //   900: '#7C2D12'
    // },
    // yellow: {
    //   50: '#FFFDEA',
    //   100: '#FFF9CA',
    //   200: '#FFF49D',
    //   300: '#FFEA3F',
    //   400: '#FFD910',
    //   500: '#EAC400',
    //   600: '#CBAA00',
    //   700: '#AA8F00',
    //   800: '#877100',
    //   900: '#594B02'
    // },
    green: {
      50: '#EAFFF4',
      100: '#C5FFE2',
      200: '#A0FFCF',
      300: '#7BFFBC',
      400: '#56FFAA',
      500: '#30FD96',
      600: '#14D473',
      700: '#00AB55',
      800: '#008241',
      900: '#00592C'
    },
    // blue: {
    // 50: '#F5F9FF',
    // 100: '#E7F0FF',
    // 200: '#CCE3FF',
    // 300: '#92C4FC',
    // 400: '#60A5FA',
    // 500: '#3700FF',
    // 600: '#2700AB',
    // 700: '#0D4EC5',
    // 800: '#003494',
    // 900: '#002260'
    // },
    grey: {
      25: '#FAFAFA',
      50: '#ECF6FF',
      100: '#DDEFFF',
      200: '#C4D7E7',
      300: '#AABDCE',
      400: '#91A4B4',
      500: '#7A8B9B',
      600: '#637381',
      700: '#4D5B68',
      800: '#4D5B68',
      900: '#1A1E22'
    }
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    secondary: "'PublicSans', sans-serif",
    size: {
      xxs: '0.6875rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem'
    },
    spacing: {
      xxs: '0.875rem',
      xs: '1rem',
      sm: '1.25rem',
      base: '1.5rem',
      lg: '1.75rem',
      xl: '1.75rem',
      xxl: '2rem'
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '700'
    }
  }
};

export default theme;

export type ThemeProps = {
  palette: Record<ThemeVariants, ThemeShade>;
  fonts: {
    primary: string;
    secondary: string;
    size: Record<ThemeSizes, string>;
    spacing: Record<ThemeSizes, string>;
    weight: {
      regular: string;
      medium: string;
      semibold: string;
    };
  };
};

export type ThemeSizes = 'xxs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl';

export type ThemeVariants =
  | 'purple'
  | 'pink'
  // | 'red'
  // | 'orange'
  // | 'yellow'
  | 'green'
  // | 'blue'
  | 'grey';

export type ThemeVariantsDeclination = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type ThemeShade = { [key: number]: string };
