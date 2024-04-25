import { yupResolver } from '@hookform/resolvers/yup';
import { t } from '@lingui/macro';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { LMSCard } from '@src/components/lms';
import LoginFooter from '@src/pages/login/LoginFooter';
import LoginHeader from '@src/pages/login/LoginHeader';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import LoginForm from 'src/pages/login/LoginForm';
import * as Yup from 'yup';
import { login } from '@redux/actions/connectedUserActions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LoginRequest } from '@services/connected-user/interfaces';

// ----------------------------------------------------------------------

const StyledLoginContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  padding: `0 ${theme.spacing(2)}`
}));

const LoginSchema = Yup.object().shape({
  login: Yup.string().required(t`Email is required`),
  password: Yup.string().required(t`Password is required`),
  organizationUuid: Yup.string().required(t`Organization id is required`)
});

const defaultValues = {
  login: '',
  password: '',
  organizationUuid: ''
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useAppSelector((state) => state.connectedUser.login);

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginRequest) => {
    dispatch(login(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledLoginContainerBox>
          <LMSCard header={<LoginHeader />} footer={<LoginFooter isLoading={loading} />}>
            <LoginForm setShowPassword={setShowPassword} showPassword={showPassword} />
          </LMSCard>
        </StyledLoginContainerBox>
      </form>
    </FormProvider>
  );
}
