import { render, screen } from '@testProvider';
import ForgotPasswordHeader from '@src/pages/login/forgot-password/ForgotPasswordHeader';

describe('ForgotPasswordHeader', () => {
  it('renders ForgotPasswordHeader component', () => {
    render(<ForgotPasswordHeader />);

    //Ensure that the "Mot de passe oublié ?" text is present
    const forgotPasswordText = screen.getByText(/Mot de passe oublié ?/i);
    expect(forgotPasswordText).toBeInTheDocument();

    //Ensure that the paragraph text is present
    const forgotPasswordParagraph = screen.getByText(/Veuillez renseigner l'adresse mail associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe./i);
    expect(forgotPasswordParagraph).toBeInTheDocument();
  });
});