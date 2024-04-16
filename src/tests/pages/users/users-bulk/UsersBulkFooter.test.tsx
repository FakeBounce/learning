import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import UsersBulkFooter from '@src/pages/users/users-bulk/UsersBulkFooter';
import { PATH_USERS } from '@utils/navigation/paths';
import { initialUserState } from '@redux/reducers/usersReducer';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('UsersBulkFooter', () => {
  it('renders UsersBulkFooter correctly', () => {
    render(<UsersBulkFooter />);

    // Ensure that the "Annuler" button is present
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_USERS.root);
    });
  });

  it('renders UsersBulkFooter with loadings', () => {
    render(<UsersBulkFooter />, {
      preloadedState: {
        applicants: {
          ...initialUserState,
          usersBulk: {
            usersBulkLoading: true
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
