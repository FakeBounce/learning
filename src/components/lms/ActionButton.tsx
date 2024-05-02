import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { memo, ReactNode } from 'react';

interface ActionButtonProps extends LoadingButtonProps {
  children: ReactNode;
  actionType?: 'action' | 'cancel' | 'update' | 'warning';
  sx?: Record<string, any>;
}
function ActionButton({ actionType = 'action', children, sx, ...other }: ActionButtonProps) {
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
    },
    warning: {
      bgcolor: theme.palette.warning.main,
      '&:hover': {
        bgcolor: theme.palette.warning.dark
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

export default memo(ActionButton);
