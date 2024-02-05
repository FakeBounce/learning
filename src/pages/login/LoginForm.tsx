import { useLocales } from '@src/locales';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Stack } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import { RHFTextField, RHFTextFieldAdornement } from '@src/components/hook-form';

// ----------------------------------------------------------------------

interface LoginFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

function LoginForm({ showPassword, setShowPassword }: LoginFormProps) {
  const { translate } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        <RHFTextField
          className="MuiFormLabel-asterisk"
          name="organization_id"
          label={
            <>
              {translate('LOGIN_ORGANISATION_ID_LABEL')}
              <span className="MuiFormLabel-asterisk"> *</span>
            </>
          }
        />

        <RHFTextField
          label={
            <>
              {translate('LOGIN_EMAIL_LABEL')}
              <span className="MuiFormLabel-asterisk"> *</span>
            </>
          }
          name="login"
        />

        <RHFTextFieldAdornement
          name="password"
          label={
            <>
              {translate('LOGIN_PASSWORD_LABEL')}
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
          {translate('LOGIN_FORGOT_PASSWORD')}
        </Link>
      </Stack>
    </>
  );
}

export default LoginForm;
