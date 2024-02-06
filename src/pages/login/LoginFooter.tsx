// @mui
import { Trans } from '@lingui/macro';
import { LoadingButton } from '@mui/lab';

import theme from '@theme';

// ----------------------------------------------------------------------

export default function LoginFooter({ isLoading }: { isLoading: boolean }) {
  return (
    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      loading={isLoading}
      sx={{
        borderRadius: 2,
        bgcolor: theme.palette.green[700],
        color: 'white',
        '&:hover': {
          bgcolor: theme.palette.green[800]
        }
      }}
    >
      <Trans>Se connecter</Trans>
    </LoadingButton>
  );
}
