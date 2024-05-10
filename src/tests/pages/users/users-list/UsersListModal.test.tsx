import { useNavigate } from 'react-router-dom';
import { act, fireEvent, render, screen, cleanup, waitFor } from '@testProvider';
import UsersListModal from '@src/pages/users/users-list/UsersListModal';
import { defaultUsersList } from '@src/tests/pages/users/DefaultUsers';
import UsersMock, { usersSetupSuccessAxiosMock } from '@src/tests/pages/users/UsersMock';

// Mock useNavigate
const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('UsersListModal', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    usersSetupSuccessAxiosMock();
  });

  afterEach(() => {
    UsersMock.reset();
    jest.resetAllMocks();
    cleanup();
  });

  it('renders UsersListModal correctly', () => {
    render(
      <UsersListModal
        cancelModal={jest.fn()}
        isModalOpen={true}
        setIsModalOpen={jest.fn()}
        userSelected={defaultUsersList[0]}
      />
    );

    expect(
      screen.getByText(`${defaultUsersList[0].lastname} ${defaultUsersList[0].firstname}`)
    ).toBeInTheDocument();
  });

  it('should trigger actions', async () => {
    const cancelModalMock = jest.fn();
    render(
      <UsersListModal
        cancelModal={cancelModalMock}
        isModalOpen={true}
        setIsModalOpen={jest.fn()}
        userSelected={defaultUsersList[0]}
      />
    );

    const validateButton = screen.getByText(/Valider/i);
    expect(validateButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(validateButton);
    });

    await waitFor(() => {
      expect(UsersMock.history.put.length).toBe(1);
      expect(UsersMock.history.put[0].url).toBe(`/users/${defaultUsersList[0].id}/block`);

      expect(cancelModalMock).toHaveBeenCalledTimes(1);
    });
  });
});
