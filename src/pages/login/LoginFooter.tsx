// @mui
import { LoadingButton } from '@mui/lab';
import { useLocales } from '@src/locales';
import theme from '@theme';

// ----------------------------------------------------------------------

export default function LoginFooter({ isLoading }: { isLoading: boolean }) {
  const { translate } = useLocales();

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
      {translate('LOGIN_SUBMIT')}
    </LoadingButton>
  );
}
