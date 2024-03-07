import { render, screen, fireEvent, waitFor, act } from '@testProvider';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import Login from '@src/pages/login/LoginPage';
import { useNavigate } from 'react-router-dom';
import LoginAxiosMock, { setupSuccessAxiosMock } from './LoginAxiosMock';
import { cleanup } from '@testing-library/react';

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

  it('should navigate if is already Authenticated', async () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the Login component
    render(<Login />, {
      preloadedState: {
        connectedUser: {
          login: {
            isAuthenticated: true
          }
        }
      }
    });

    await waitFor(() => {
      // Check if the navigate function has been called
      expect(navigateMock).toHaveBeenCalledWith(PATH_DASHBOARD.root);
    });
  });
});
