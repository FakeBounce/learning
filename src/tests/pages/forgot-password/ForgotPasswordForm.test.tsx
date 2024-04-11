import { render, renderHook, screen } from '@testProvider';
import { FormProvider, useForm } from 'react-hook-form';
import ForgotPasswordForm from '@src/pages/login/forgot-password/ForgotPasswordForm';

describe('ForgotPasswordForm', () => {
  it('render ForgotPasswordForm component', () => {
    const methods = renderHook(() => useForm()).result.current;

    render(
      <FormProvider {...methods}>
        <form>
          <ForgotPasswordForm />
        </form>
      </FormProvider>
    );

    //Ensure that the "Organization ID" label is present
    const orgIdLabel = screen.getByLabelText(/Organisation ID/i);
    expect(orgIdLabel).toBeInTheDocument();

    //Ensure that the "Adresse mail" label is presentf
    const emailLabel = screen.getByLabelText(/Adresse mail/i);
    expect(emailLabel).toBeInTheDocument();
  });
});