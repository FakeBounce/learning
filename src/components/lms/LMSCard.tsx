// @mui
import { Stack, Paper } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

interface LMSCardProps {
  width?: number;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export default function LMSCard({ width, header, footer, children }: LMSCardProps) {
  return (
    <Stack sx={{ width: width || '100%' }}>
      <Paper elevation={3} sx={{ paddingX: 5, paddingY: 4, borderRadius: 4 }}>
        {header && (
          <Stack spacing={2} sx={{ mb: 4 }}>
            {header}
          </Stack>
        )}
        {children}
        {footer && (
          <Stack spacing={2} sx={{ mt: 4 }}>
            {footer}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
