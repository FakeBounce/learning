import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_ROLES } from '@utils/navigation/paths';
import { rolesInitialState } from '@redux/reducers/rolesReducer';
import RolesUpdateFooter from '@src/pages/roles/roles-update/RolesUpdateFooter';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('RolesUpdateFooter', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    act(() => {
      render(<RolesUpdateFooter />);
    });

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ROLES.root);
    });
  });

  it('should be disabled if state is loading', async () => {
    await act(async () => {
      render(<RolesUpdateFooter />, {
        preloadedState: {
          roles: {
            ...rolesInitialState,
            rolesUpdate: {
              rolesUpdateLoading: true
            }
          }
        }
      });
    });

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toBeDisabled();

    const submitButton = screen.getByRole('submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
