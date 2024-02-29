import { useAuthenticationContext } from '@src/auth/AuthenticationContext';
import { render, screen, fireEvent, waitFor, act } from '@testProvider';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import Login from '@src/pages/login/LoginPage';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

// Mock useAuthenticationContext
jest.mock('@src/auth/AuthenticationContext', () => ({
  useAuthenticationContext: jest.fn()
}));

describe('Login component', () => {
  it('renders Login component and submit correctly', async () => {
    // Mock the login function in useAuthenticationContext
    const loginMock = jest.fn().mockResolvedValueOnce({});
    // Mock useAuthenticationContext to return the mock login function
    (useAuthenticationContext as jest.Mock).mockReturnValue({
      login: loginMock
    });

    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the Login component
    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Login/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByLabelText(/Organisation ID/i), { target: { value: 'testorg' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for the login function to be called
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('testuser', 'testpassword', 'testorg');
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_DASHBOARD.root);
  });

  it('display and error correctly', async () => {
    // Mock the login function in useAuthenticationContext
    const loginMock = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: { message: { value: 'error message' } } } });
    (useAuthenticationContext as jest.Mock).mockReturnValue({
      login: loginMock
    });

    // Render the Login component
    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Login/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByLabelText(/Organisation ID/i), { target: { value: 'testorg' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for the login function to be called
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('testuser', 'testpassword', 'testorg');
    });

    // Check if enqueueSnackbar is called in case of an error
    await waitFor(() => {
      expect(screen.getByText('error message')).toBeInTheDocument();
    });
  });
});
