import { render, screen } from '@testProvider';
import LoginHeader from '@src/pages/login/LoginHeader';

describe('LoginHeader', () => {
  it('renders LoginHeader component', () => {
    render(<LoginHeader />);

    // Ensure that the "Connexion" text is present
    const connexionText = screen.getByText(/Connexion/i);
    expect(connexionText).toBeInTheDocument();

    // Ensure that the "Pas encore de compte ?" text is present
    const noAccountText = screen.getByText(/Pas encore de compte ?/i);
    expect(noAccountText).toBeInTheDocument();

    // Ensure that the "Créer un compte" NavLink is present with the correct path
    const createAccountLink = screen.getByText(/Créer un compte/i).closest('a');
    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink?.getAttribute('href')).toBe('/register');
  });
});
