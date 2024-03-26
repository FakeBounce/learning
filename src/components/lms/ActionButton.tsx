import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

interface ActionButtonProps extends LoadingButtonProps {
  children: ReactNode;
  actionType?: 'action' | 'cancel' | 'update';
  sx?: Record<string, any>;
}
export default function ActionButton({
  actionType = 'action',
  children,
  sx,
  ...other
}: ActionButtonProps) {
  const theme = useTheme();

  const sxConfig = {
    action: {
      bgcolor: theme.palette.primary.main,
      '&:hover': {
        bgcolor: theme.palette.primary.dark
      }
    },
    cancel: {
      bgcolor: theme.palette.grey[400],
      '&:hover': {
        bgcolor: theme.palette.grey[600]
      }
    },
    update: {
      bgcolor: theme.palette.secondary.main,
      '&:hover': {
        bgcolor: theme.palette.secondary.dark
      }
    }
  };
  return (
    <LoadingButton
      sx={{
        minWidth: 100,
        borderRadius: 2,
        paddingX: 2,
        textTransform: 'none',
        color: 'white',
        ...sxConfig[actionType],
        ...sx
      }}
      {...other}
    >
      {children}
    </LoadingButton>
  );
}
