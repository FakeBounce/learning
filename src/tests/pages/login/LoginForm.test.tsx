import { render, screen, renderHook } from '@testProvider';
import LoginForm from '@src/pages/login/LoginForm';
import { PATH_AUTH } from '@utils/navigation/paths';
import { FormProvider, useForm } from 'react-hook-form';

describe('LoginForm', () => {
  it('renders LoginForm component', () => {
    const methods = renderHook(() => useForm()).result.current;
    // Mock setShowPassword function
    const setShowPasswordMock = jest.fn();
    render(
      <FormProvider {...methods}>
        <form>
          <LoginForm showPassword={false} setShowPassword={setShowPasswordMock} />
        </form>
      </FormProvider>
    );

    // Ensure that the "Organisation ID" label is present
    const orgIdLabel = screen.getAllByText(/Organisation ID/i);
    expect(orgIdLabel.length).toBeGreaterThan(0);

    // Ensure that the "Login" label is present
    const loginLabel = screen.getAllByText(/Login/i);
    expect(loginLabel.length).toBeGreaterThan(0);

    // Ensure that the "Mot de passe" label is present
    const passwordLabel = screen.getAllByText(/Mot de passe/i);
    expect(passwordLabel.length).toBeGreaterThan(0);

    // Ensure that the "Mot de passe oublié ?" link is present with the correct path
    const forgotPasswordLink = screen.getByText(/Mot de passe oublié ?/i).closest('a');
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink?.getAttribute('href')).toBe(PATH_AUTH.resetPassword);
  });
});
