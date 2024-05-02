import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_GROUPS } from '@utils/navigation/paths';
import { groupsInitialState } from '@redux/reducers/groupsReducer';
import GroupsUpdateFooter from '@src/pages/groups/groups-update/GroupsUpdateFooter';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('GroupsUpdateFooter', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    act(() => {
      render(<GroupsUpdateFooter />);
    });

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_GROUPS.root);
    });
  });

  it('should be disabled if state is loading', async () => {
    await act(async () => {
      render(<GroupsUpdateFooter />, {
        preloadedState: {
          groups: {
            ...groupsInitialState,
            groupsUpdate: {
              groupsUpdateLoading: true
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
