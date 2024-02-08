import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
import HeaderBreadcrumbs from '@src/components/layouts/main-layout/HeaderBreadcrumbs';
import HeaderRightContent from '@src/components/layouts/main-layout/HeaderRightContent';
import theme from '@theme';
import Box from '@mui/material/Box';

export const HEADER_HEIGHT = 10;
export default function Header() {
  return (
    <>
      <Box
        height={`${HEADER_HEIGHT}vh`}
        pt={1}
        ml={2}
        px={[0,2]}
        display="flex"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Typography sx={{ fontWeight: theme.fonts.weight.medium }}>Market Academy</Typography>
          <Typography ml={0.5}>
            <Trans>(global)</Trans>
          </Typography>
        </Box>
        <HeaderRightContent />
      </Box>
      <HeaderBreadcrumbs />
    </>
  );
}
