import { render, screen, fireEvent, act, waitFor, cleanup } from '@testProvider';
import UsersBulkFooter from '@src/pages/users/users-bulk/UsersBulkFooter';
import { PATH_USERS } from '@utils/navigation/paths';
import { initialUserState } from '@redux/reducers/usersReducer';
import { useNavigate } from 'react-router-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('UsersBulkFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders UsersBulkFooter correctly', async () => {
    render(<UsersBulkFooter />);

    // Ensure that the "Annuler" button is present
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_USERS.root);
    });
  });

  it('renders UsersBulkFooter with loadings', async () => {
    render(<UsersBulkFooter />, {
      preloadedState: {
        users: {
          ...initialUserState,
          usersBulk: {
            usersBulkLoading: true
          }
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
