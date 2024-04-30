import { yupResolver } from '@hookform/resolvers/yup';
import { t } from '@lingui/macro';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { LMSCard } from '@src/components/lms';
import { useForm, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { useAppDispatch } from '@redux/hooks';
import ForgotPasswordHeader from '@src/pages/login/forgot-password/ForgotPasswordHeader';
import ForgotPasswordFooter from '@src/pages/login/forgot-password/ForgotPasswordFooter';
import ForgotPasswordForm from '@src/pages/login/forgot-password/ForgotPasswordForm';
import { forgotPassword } from '@redux/actions/connectedUserActions';
import { ForgotPasswordRequest } from '@services/connected-user/interfaces';

// ----------------------------------------------------------------------

const StyledLoginContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  padding: `0 ${theme.spacing(2)}`
}));

const ForgotPasswordPageSchema = Yup.object().shape({
  organizationUuid: Yup.string().required(t`L'organisation ID est obligatoire`),
  email: Yup.string().required(t`L'email est obligatoire`)
});

const defaultValues = {
  organizationUuid: '',
  email: ''
};

export default function ForgotPasswordPage() {

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(ForgotPasswordPageSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ForgotPasswordRequest) => {
    dispatch(
      forgotPassword(data)
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledLoginContainerBox>
          <LMSCard header={<ForgotPasswordHeader />} footer={<ForgotPasswordFooter />}>
            <ForgotPasswordForm />
          </LMSCard>
        </StyledLoginContainerBox>
      </form>
    </FormProvider>
  );
}
