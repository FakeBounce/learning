import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import PageNotFoundIllustration from '@src/assets/illustrations/PageNotFoundIllustration';
// ----------------------------------------------------------------------

// @todo: Rework text and page
export default function Page404() {
  return (
    <>
      <Typography variant="h3" paragraph align="center">
        <Trans>404 Title</Trans>
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
        sure to check your spelling.
      </Typography>

      <PageNotFoundIllustration
        sx={{
          height: 260,
          my: { xs: 5, sm: 10 }
        }}
      />
      <Box alignItems="center" width="100%" display="flex" justifyContent="center">
        <Button component={'a'} href="/login" size="large" variant="contained">
          Go to Home
        </Button>
      </Box>
    </>
  );
}
