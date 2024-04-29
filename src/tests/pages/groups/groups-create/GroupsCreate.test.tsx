import { render, screen, act, fireEvent, cleanup, waitFor } from '@testProvider';
import GroupsCreate from '@src/pages/groups/groups-create/GroupsCreate';
import groupsMock, { groupsSetupSuccessAxiosMock } from '@src/tests/pages/groups/GroupsMock';
import { useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('GroupsCreate', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    groupsSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    groupsMock.reset();
  });

  it('should render correctly', () => {
    act(() => {
      render(<GroupsCreate />);
    });

    const title = screen.getByText(/Ajouter un groupe/i);
    expect(title).toBeInTheDocument();
  });

  it('should send form data correctly', async () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await act(async () => {
      render(<GroupsCreate />);
    });

    const nameInput = screen.getByLabelText(/Nom du groupe/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByRole('submit');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(groupsMock.history.post.length).toBeGreaterThanOrEqual(2);
      expect(groupsMock.history.post[1].url).toBe('/groups');
      expect(groupsMock.history.post[1].data).toBe(
        JSON.stringify({
          name: 'Test Group',
          description: 'Test Description'
        })
      );
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_GROUPS.root);
    });
  });
});
