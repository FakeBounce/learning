import { Stack, Paper, Box } from '@mui/material';
import { ReactNode } from 'react';

interface LMSCardProps {
  cardCss?: Record<string, any>;
  isPageCard?: boolean;
  canExpand?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  contentPadding?: number;
}

const defaultCss = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  maxWidth: 500,
  paddingX: 5,
  paddingY: 4,
  borderColor: 'transparent',
  borderRadius: 4,
};

const pageCardCss = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  borderColor: 'transparent',
  borderRadius: 4,
  padding: 0,
  maxWidth: '100%',
  paddingBottom: 3,
  marginBottom: 2
};

export default function LMSCard({
  cardCss,
  isPageCard = false,
  canExpand = false,
  header,
  footer,
  children,
  contentPadding = 4
}: LMSCardProps) {
  // Keep theme and matches in case need later
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const chosenCss = isPageCard ? pageCardCss : defaultCss;
  const mergedCardCss = {
    ...chosenCss,
    ...cardCss
  };

  if (isPageCard) {
    return (
      <Stack px={2} maxWidth="100%" flex={'1 1 0'}>
        <Paper elevation={3} sx={{ ...mergedCardCss }}>
          {header && (
            <Stack spacing={2} p={2} px={4}>
              {header}
            </Stack>
          )}
          {canExpand ? (
            <Box gap={2} px={contentPadding} sx={{ flex: '1 1 0' }}>
              {children}
            </Box>
          ) : (
            <Stack spacing={2} px={contentPadding} sx={{ flex: '1 1 0' }}>
              {children}
            </Stack>
          )}

          {footer && (
            <Stack spacing={2} pt={2} px={4} sx={{ mt: 2 }}>
              {footer}
            </Stack>
          )}
        </Paper>
      </Stack>
    );
  }

  return (
    <Paper elevation={3} sx={{ ...mergedCardCss }}>
      {header && (
        <Stack spacing={2} mb={2}>
          {header}
        </Stack>
      )}
      {children}
      {footer && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {footer}
        </Stack>
      )}
    </Paper>
  );
}
