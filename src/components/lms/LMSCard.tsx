import { Stack, Paper } from '@mui/material';
// Keep theme and matches in case need later
// import { Stack, Paper, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
// ----------------------------------------------------------------------

interface LMSCardProps {
  stackCss?: Record<string, any>;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export default function LMSCard({ stackCss, header, footer, children }: LMSCardProps) {
  // Keep theme and matches in case need later
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const mergedStackCss = {
    maxWidth: 500,
    width: '100%',
    ...stackCss
  };
  return (
    <Stack sx={mergedStackCss}>
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
