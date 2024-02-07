import { Trans } from '@lingui/macro';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import HeaderRightContent from '@src/components/layouts/main-layout/HeaderRightContent.tsx';
import { Sidebar } from '@src/components/layouts/sidebar';
import theme from '@theme';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';

export default function MainLayout() {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  console.log('path', pathname);

  return (
    <Box display={'flex'} width="100%">
      <Sidebar open={open} setOpen={setOpen} />
      <Stack mt={3} px={2} width="100%">
        <Box  ml={2} display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography sx={{ fontWeight: theme.fonts.weight.medium }}>Market Academy</Typography>
            <Typography ml={0.5}>
              <Trans>(global)</Trans>
            </Typography>
          </Box>

          <HeaderRightContent />
        </Box>
        <Breadcrumbs sx={{ml:4, mt:2}}>
          <Link color="inherit" href="components/mui#">
            Material-UI
          </Link>
          <Link color="inherit" href="components/mui#">
            Core
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
        </Breadcrumbs>
        <Box display={'flex'} width="100%" mt={3}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
}
