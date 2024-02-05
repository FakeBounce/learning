import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useAuthenticationContext } from '@src/auth/AuthenticationContext';
import { LMSCard } from '@src/components/lms';
import { PATH_AFTER_LOGIN } from '@src/config-global';
import LoginFooter from '@src/pages/login/LoginFooter';
import LoginHeader from '@src/pages/login/LoginHeader';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm from 'src/pages/login/LoginForm';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

const StyledLoginContainerBox = styled(Box)(() => ({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0
}));

const LoginSchema = Yup.object().shape({
  login: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
  organization_id: Yup.string().required('Organization id is required')
});

const defaultValues = {
  login: '',
  password: '',
  organization_id: ''
};

export default function Login() {
  const { login } = useAuthenticationContext();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isLoading }
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await login(data.login, data.password, data.organization_id);
      navigate(PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      // @todo Add snack as error
    }
  };

  return (
    <StyledLoginContainerBox>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LMSCard
            width={500}
            header={<LoginHeader />}
            footer={<LoginFooter isLoading={!isLoading} />}
          >
            <LoginForm setShowPassword={setShowPassword} showPassword={showPassword} />
          </LMSCard>
        </form>
      </FormProvider>
    </StyledLoginContainerBox>
  );
}
