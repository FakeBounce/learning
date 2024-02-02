import { useAuthenticationContext } from '@src/auth/AuthenticationContext';
import { useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
import { PATH_AFTER_LOGIN } from '../../config-global';
import Iconify from '@src/components/iconify/Iconify';
// components
import { RHFTextField } from '@src/components/hook-form';

// ----------------------------------------------------------------------

const LoginSchema = Yup.object().shape({
  login: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
  organization_id: Yup.string().required('Organization id is required'),
  errors: Yup.object().shape({
    afterSubmit: Yup.object().shape({
      message: Yup.string().required('Error')
    })
  })
});

const defaultValues = {
  login: '',
  password: '',
  organization_id: ''
};

// @TODO - Add a loading spinner and errors from form correctly
export default function AuthLoginForm() {
  const { login } = useAuthenticationContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    // @todo - fix any weird behavior from yup when adding errors from rhf
    resolver: yupResolver<any>(LoginSchema),
    defaultValues
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful }
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await login(data.login, data.password, data.organization_id);
      navigate(PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      const x = error as { response: { data: { message: { value: string } } } };
      setError('afterSubmit', {
        ...x,
        message: x.response.data.message.value
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="login" label="Login" />

          {/*// @todo - Create a specific component with adornement */}
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <RHFTextField name="organization_id" label="Organization id" />
        </Stack>

        <Stack alignItems="flex-end" sx={{ my: 2 }}>
          <Link
            component={RouterLink}
            to={PATH_AUTH.resetPassword}
            variant="body2"
            color="inherit"
            underline="always"
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitSuccessful || isSubmitting}
          sx={{
            bgcolor: 'primary.main',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800')
            }
          }}
        >
          Login
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
