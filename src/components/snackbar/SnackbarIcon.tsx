import { Box } from '@mui/material';
import Iconify from '../iconify/Iconify';
// ----------------------------------------------------------------------

interface SnackbarIconProps {
  icon: string;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

// @todo - Update the color to match the theme
function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`
      }}
    >
      <Iconify icon={icon} width={24} />
    </Box>
  );
}

export default SnackbarIcon;
