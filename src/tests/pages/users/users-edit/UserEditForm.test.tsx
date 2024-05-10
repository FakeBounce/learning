import { render, screen, waitFor, renderHook } from '@testProvider';
import UserEditForm from '@src/pages/users/users-edit/UserEditForm';
import { FormProvider, useForm } from 'react-hook-form';

describe('UserEditForm', () => {
  it('renders UserEditForm correctly', () => {
    const methods = renderHook(() => useForm()).result.current;

    waitFor(() => {
      render(
        <FormProvider {...methods}>
          <form>
            <UserEditForm />
          </form>
        </FormProvider>
      );
    });

    expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Double authentification/i)).toBeInTheDocument();
  });
});
