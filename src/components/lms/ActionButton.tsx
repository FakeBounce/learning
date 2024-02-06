import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import theme from '@theme';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

interface ActionButtonProps extends LoadingButtonProps {
  children: ReactNode;
  actionType?: 'action' | 'cancel';
  sx?: Record<string, any>;
}
export default function ActionButton({
  actionType = 'action',
  children,
  sx,
  ...other
}: ActionButtonProps) {
  if (actionType === 'cancel') {
    return (
      <LoadingButton
        sx={{
          borderRadius: 2,
          bgcolor: theme.palette.grey[400],
          color: 'white',
          '&:hover': {
            bgcolor: theme.palette.grey[600]
          },
          ...sx
        }}
        {...other}
      >
        {children}
      </LoadingButton>
    );
  }

  return (
    <LoadingButton
      sx={{
        borderRadius: 2,
        bgcolor: theme.palette.green[700],
        color: 'white',
        '&:hover': {
          bgcolor: theme.palette.green[800]
        },
        ...sx
      }}
      {...other}
    >
      {children}
    </LoadingButton>
  );
}
