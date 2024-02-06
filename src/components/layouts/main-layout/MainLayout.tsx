import { Trans } from '@lingui/macro';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import HeaderRightContent from '@src/components/layouts/main-layout/HeaderRightContent.tsx';
import { Sidebar } from '@src/components/layouts/sidebar';
import theme from '@theme';
import { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <Box display={'flex'} width="100%">
      <Sidebar open={open} setOpen={setOpen} />
      <Stack mt={3} px={2} width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography sx={{ fontWeight: theme.fonts.weight.medium }}>Market Academy</Typography>
            <Typography ml={0.5}>
              <Trans>(global)</Trans>
            </Typography>
          </Box>

          <HeaderRightContent />
        </Box>
        <Breadcrumbs>
          <Link color="inherit" href="components/mui#">
            Material-UI
          </Link>
          <Link color="inherit" href="components/mui#">
            Core
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
        </Breadcrumbs>
        <Box display={'flex'} width="100%">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
