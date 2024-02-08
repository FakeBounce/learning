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
          className="MuiFormLabel-asterisk"
          name="organization_id"
          label={
            <>
              <Trans>Organisation ID</Trans>
              <span className="MuiFormLabel-asterisk"> *</span>
            </>
          }
        />

        <RHFTextField
          label={
            <>
              <Trans>Login</Trans>
              <span className="MuiFormLabel-asterisk"> *</span>
            </>
          }
          name="login"
        />

        <RHFTextFieldAdornement
          name="password"
          label={
            <>
              <Trans>Mot de passe</Trans>
              <span className="MuiFormLabel-asterisk"> *</span>
            </>
          }
          type={showPassword ? 'text' : 'password'}
          onClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ mt: 1 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
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
