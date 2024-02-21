import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();

  if (actionType === 'cancel') {
    return (
      <LoadingButton
        sx={{
          minWidth: 100,
          borderRadius: 2,
          bgcolor: theme.palette.grey[400],
          color: 'white',
          '&:hover': {
            bgcolor: theme.palette.grey[600]
          },
          textTransform: 'none',
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
        minWidth: 100,
        borderRadius: 2,
        bgcolor: theme.palette.primary.dark,
        color: 'white',
        '&:hover': {
          bgcolor: theme.palette.primary.darker
        },
        textTransform: 'none',
        ...sx
      }}
      {...other}
    >
      {children}
    </LoadingButton>
  );
}
