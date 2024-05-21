import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import RolesCreateFooter from '@src/pages/roles/roles-create/RolesCreateFooter';
import { PATH_ROLES } from '@utils/navigation/paths';
import { rolesInitialState } from '@redux/reducers/rolesReducer';
import { useNavigate } from 'react-router-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesCreateFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    act(() => {
      render(<RolesCreateFooter />);
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
      render(<RolesCreateFooter />, {
        preloadedState: {
          roles: {
            ...rolesInitialState,
            rolesCreate: {
              rolesCreateLoading: true
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
