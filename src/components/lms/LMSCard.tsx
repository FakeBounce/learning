import { Stack, Paper } from '@mui/material';
// Keep theme and matches in case need later
// import { Stack, Paper, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
// ----------------------------------------------------------------------

interface LMSCardProps {
  cardCss?: Record<string, any>;
  isPageCard?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const defaultCss = {
  maxWidth: 500,
  width: '100%',
  paddingX: 5,
  paddingY: 4,
  borderColor: 'transparent',
  borderRadius: 4
};

const pageCardCss = {
  borderColor: 'transparent',
  borderRadius: 4,
  maxWidth: '100%',
  width: '100%',
  maxHeight: '78vh',
  height: '100%',
  padding: 0
};

export default function LMSCard({
  cardCss,
  isPageCard = false,
  header,
  footer,
  children
}: LMSCardProps) {
  // Keep theme and matches in case need later
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const chosenCss = isPageCard ? pageCardCss : defaultCss;
  const mergedCardCss = {
    ...chosenCss,
    ...cardCss
  };

  return (
    <Paper elevation={3} sx={{ ...mergedCardCss }}>
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
  );
}
