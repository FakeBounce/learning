import { render, screen, waitFor } from '@testProvider';
import { rolesSetupSuccessAxiosMock } from '@src/tests/pages/roles/RolesMock';
import UsersList from '@src/pages/users/users-list/UsersList';
import { defaultUsersList } from '@src/tests/pages/users/DefaultUsers';
import UsersMock, { usersSetupSuccessAxiosMock } from '@src/tests/pages/users/UsersMock';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));
jest.mock('@src/pages/users/users-list/UsersListModal', () => jest.fn());
jest.mock('@src/pages/users/users-list/UsersListHeader', () => jest.fn());
jest.mock('@src/pages/users/users-list/UsersListPopperContent', () => jest.fn());

describe('UsersList', () => {
  beforeEach(() => {
    usersSetupSuccessAxiosMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
    UsersMock.reset();
  });

  it('renders UsersList correctly', async () => {
    rolesSetupSuccessAxiosMock();
    render(<UsersList />);

    await waitFor(() => {
      defaultUsersList.forEach((user) => {
        expect(screen.getByText(user.lastname)).toBeInTheDocument();
      });
    });

    expect(screen.getAllByTestId(/chipActions/i)).toHaveLength(defaultUsersList.length);
  });
});
