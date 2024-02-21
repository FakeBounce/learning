import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeaderBreadcrumbs from '@src/components/layouts/main-layout/HeaderBreadcrumbs';
import HeaderRightContent from '@src/components/layouts/main-layout/HeaderRightContent';
import Box from '@mui/material/Box';

export const HEADER_HEIGHT = 10;
export default function Header() {
  const theme = useTheme();

  return (
    <>
      <Box
        height={`${HEADER_HEIGHT}vh`}
        pt={1}
        ml={2}
        px={[0, 2]}
        display="flex"
        justifyContent="space-between"
        boxSizing="border-box"
      >
        <Box display="flex" alignItems="center">
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            Market Academy
          </Typography>
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
