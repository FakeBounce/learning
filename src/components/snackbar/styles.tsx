// import { useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import theme from '@theme';

// ----------------------------------------------------------------------

export default function StyledNotistack() {
  // @Todo rework theme to use MUI
  // const theme = useTheme();

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '#root': {
          '.notistack-MuiContent': {
            minWidth: '80vw',
            paddingLeft: '1rem',
            boxShadow: 'none',
          },
          '.notistack-MuiContent-success': {
            backgroundColor: theme.palette.green[100],
            color: theme.palette.green[700],
            borderRadius: 12,
            svg: {
              color: theme.palette.green[700]
            }
          }
        }
      }}
    />
  );

  return inputGlobalStyles;
}
