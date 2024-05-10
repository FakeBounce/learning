import { generatePath, useNavigate } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testProvider';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import UserProfileHeader from '@src/pages/users/users-profile/UserProfileHeader';
import { defaultUser } from '@src/tests/pages/users/DefaultUsers';
import { PATH_USERS } from '@utils/navigation/paths';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

// Mock useNavigate
const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

const defaultStateForUsersListHeader = {
  preloadedState: {
    users: {
      singleUser: {
        singleUserData: defaultUser,
        singleUserLoading: false
      }
    }
  }
};

describe('UsersListHeader', () => {
  const mockPageType = PermissionTypeEnum.USERS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockPageType });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('renders UsersListHeader correctly', () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UserProfileHeader />
      </FeatureFlagContext.Provider>,
      defaultStateForUsersListHeader
    );

    expect(screen.getByText(defaultUser.lastname)).toBeInTheDocument();
  });

  it('should navigate to edit on click', () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UserProfileHeader />
      </FeatureFlagContext.Provider>,
      defaultStateForUsersListHeader
    );

    const editButton = screen.getByRole('button', { name: 'Modifier' });
    expect(editButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(editButton);
    });

    expect(navigateMock).toHaveBeenCalledWith(
      generatePath(PATH_USERS.update, { userId: String(defaultUser.id) })
    );
  });

  it('should not have a navigate button if no rights', () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(false),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UserProfileHeader />
      </FeatureFlagContext.Provider>,
      defaultStateForUsersListHeader
    );

    expect(screen.queryByRole('button', { name: 'Modifier' })).not.toBeInTheDocument();
  });
});
