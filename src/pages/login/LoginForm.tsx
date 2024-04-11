import { Trans } from '@lingui/macro';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack } from '@mui/material';
import { PATH_AUTH } from '@utils/navigation/paths';
import { RHFTextField, RHFTextFieldAdornement } from '@src/components/hook-form';

interface LoginFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

function LoginForm({ showPassword, setShowPassword }: LoginFormProps) {
  return (
    <>
      <Stack spacing={3}>
        <RHFTextField
          name="organizationUuid"
          size="medium"
          label={<Trans>Organization ID</Trans>}
          required
        />

        <RHFTextField size="medium" label={<Trans>Login</Trans>} required name="login" />

        <RHFTextFieldAdornement
          name="password"
          size="medium"
          label={<Trans>Mot de passe</Trans>}
          required
          type={showPassword ? 'text' : 'password'}
          onClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
          data-testid="password-adornment"
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ mt: 1 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.forgotPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          <Trans>Mot de passe oublié ?</Trans>
        </Link>
      </Stack>
    </>
  );
}

export default LoginForm;
