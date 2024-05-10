import { useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent, waitFor } from '@testProvider';
import UserEditFooter from '@src/pages/users/users-edit/UserEditFooter';
import { PATH_USERS } from '@utils/navigation/paths';

const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('UserEditFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('renders UserEditFooter correctly', () => {
    render(<UserEditFooter />);

    expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
    expect(screen.getByText(/Annuler/i)).toBeInTheDocument();
  });

  it('navigate on profile if canceling', () => {
    render(<UserEditFooter />);

    act(() => {
      fireEvent.click(screen.getByText(/Annuler/i));
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_USERS.profile);
    });
  });

  it('should be disabled if loading', () => {
    render(<UserEditFooter />, {
      preloadedState: {
        users: {
          updatedUser: {
            updatedUserLoading: true
          }
        }
      }
    });

    act(() => {
      fireEvent.click(screen.getByText(/Annuler/i));
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_USERS.profile);
    });
  });
});
