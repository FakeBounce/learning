import { render, screen, fireEvent, waitFor, act, cleanup } from '@testProvider';
import Login from '@src/pages/login/LoginPage';
import { useNavigate } from 'react-router-dom';
import LoginAxiosMock, { setupSuccessAxiosMock } from './LoginAxiosMock';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('Login component', () => {
  afterEach(() => {
    LoginAxiosMock.reset();
    cleanup();
  });

  it('renders Login component and submit correctly', async () => {
    setupSuccessAxiosMock();

    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the Login component
    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Login/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByLabelText(/Organization ID/i), { target: { value: 'testorg' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for the login function to be called
    await waitFor(() => {
      expect(LoginAxiosMock.history.post.length).toBe(1);
      expect(JSON.parse(LoginAxiosMock.history.post[0].data)).toStrictEqual({
        login: 'testuser',
        password: 'testpassword',
        organization_uuid: 'testorg'
      });
    });
  });
});
