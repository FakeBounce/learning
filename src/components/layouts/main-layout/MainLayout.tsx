import { Stack } from '@mui/material';
import Header from '@src/components/layouts/main-layout/Header';
import { Sidebar } from '@src/components/layouts/sidebar';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import { drawerWidth } from '@src/components/layouts/sidebar/styles';
import { useTheme } from '@mui/material/styles';

export default function MainLayout() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  return (
    <Box display={'flex'} width="100%">
      <Sidebar open={open} setOpen={setOpen} />
      <Stack
        height="100vh"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${theme.spacing(7)})`
        }}
      >
        <Header />
        <Box display={'flex'} flex={'1 1 0'} height="100%" width="100%" mt={3} mb={2}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
}
