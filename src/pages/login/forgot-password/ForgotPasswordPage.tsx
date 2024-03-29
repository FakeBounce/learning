import { yupResolver } from '@hookform/resolvers/yup';
import { t } from '@lingui/macro';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { LMSCard } from '@src/components/lms';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import ForgotPasswordHeader from '@src/pages/login/forgot-password/ForgotPasswordHeader';
import ForgotPasswordFooter from '@src/pages/login/forgot-password/ForgotPasswordFooter';
import ForgotPasswordForm from '@src/pages/login/forgot-password/ForgotPasswordForm';
import { forgotPassword } from '@redux/actions/connectedUserActions';

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
  organization_id: Yup.string().required(t`L'organisation ID est obligatoire`),
  email: Yup.string().required(t`L'email est obligatoire`)
});

const defaultValues = {
  organization_id: '',
  email: ''
};

export default function ForgotPasswordPage() {
  const { loading } = useAppSelector((state) => state.connectedUser.forgotPassword);
  const isAuthenticated = useAppSelector((state) => state.connectedUser.login.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD.root);
    }
  }, [isAuthenticated]);

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    dispatch(
      forgotPassword({ email: data.email, organization_uuid: data.organization_id })
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledLoginContainerBox>
          <LMSCard header={<ForgotPasswordHeader />} footer={<ForgotPasswordFooter isLoading={loading} />}>
            <ForgotPasswordForm />
          </LMSCard>
        </StyledLoginContainerBox>
      </form>
    </FormProvider>
  );
}
