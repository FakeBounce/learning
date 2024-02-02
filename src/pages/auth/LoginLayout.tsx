import { styled } from '@mui/system';
// @mui
import { Stack, Paper } from '@mui/material';
import { ReactNode } from 'react';

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative'
}));

export const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(30, 8, 0, 8)
  }
}));

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <StyledRoot>
      <StyledContent>
        <Stack sx={{ width: 500 }}>
          <Paper elevation={3} sx={{ paddingX: 5, paddingY: 3 }}>
            {children}
          </Paper>
        </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
