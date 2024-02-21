// import { useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function StyledNotistack() {
  const theme = useTheme();

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '#root': {
          '.notistack-MuiContent': {
            minWidth: '80vw',
            paddingLeft: '1rem',
            boxShadow: 'none'
          },
          '.notistack-MuiContent-success': {
            backgroundColor: theme.palette.primary.lighter,
            color: theme.palette.primary.dark,
            borderRadius: theme.shape.borderRadius,
            svg: {
              color: theme.palette.primary.dark
            }
          }
        }
      }}
    />
  );

  return inputGlobalStyles;
}
