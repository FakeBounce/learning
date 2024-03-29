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
    const orgIdLabel = screen.getAllByText(/Organisation ID/i);
    expect(orgIdLabel.length).toBeGreaterThan(0);

    //Ensure that the "Adresse mail" label is present
    const emailLabel = screen.getAllByText(/Adresse mail/i);
    expect(emailLabel.length).toBeGreaterThan(0);
  });
});