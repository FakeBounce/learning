import { generatePath, useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testProvider';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import UsersListPopperContent from '@src/pages/users/users-list/UsersListPopperContent';
import { defaultInactiveUser, defaultUsersList } from '@src/tests/pages/users/DefaultUsers';
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

describe('UsersListPopperContent', () => {
  const mockPageType = PermissionTypeEnum.USERS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockPageType });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('renders UsersListPopperContent correctly', () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UsersListPopperContent userSelected={defaultUsersList[0]} handleToggleBlock={jest.fn()} />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Bloquer/i)).toBeInTheDocument();
    expect(screen.getByText(/Profil/i)).toBeInTheDocument();
  });

  it('should navigate on profile', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UsersListPopperContent userSelected={defaultUsersList[0]} handleToggleBlock={jest.fn()} />
      </FeatureFlagContext.Provider>
    );

    const profileButton = screen.getByText(/Profil/i);
    expect(profileButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(profileButton);
    });

    expect(navigateMock).toHaveBeenCalledWith(
      generatePath(PATH_USERS.profile, { userId: String(defaultUsersList[0].id) })
    );
  });

  it('should navigate trigger handleBlockFunc', async () => {
    const handleToggleBlock = jest.fn();
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UsersListPopperContent
          userSelected={defaultUsersList[0]}
          handleToggleBlock={handleToggleBlock}
        />
      </FeatureFlagContext.Provider>
    );

    const blockButton = screen.getByText(/Bloquer/i);
    expect(blockButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(blockButton);
    });

    expect(handleToggleBlock).toHaveBeenCalledTimes(1);
  });

  it('should navigate trigger handleUnblockFunc', async () => {
    const handleToggleBlock = jest.fn();
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UsersListPopperContent
          userSelected={defaultInactiveUser}
          handleToggleBlock={handleToggleBlock}
        />
      </FeatureFlagContext.Provider>
    );

    const blockButton = screen.getByText(/Débloquer/i);
    expect(blockButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(blockButton);
    });

    expect(handleToggleBlock).toHaveBeenCalledTimes(1);
  });

  it('should not display block if no rights', async () => {
    const handleToggleBlock = jest.fn();
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(false),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UsersListPopperContent
          userSelected={defaultUsersList[0]}
          handleToggleBlock={handleToggleBlock}
        />
      </FeatureFlagContext.Provider>
    );

    const blockButton = screen.queryByText(/Bloquer/i);
    expect(blockButton).not.toBeInTheDocument();
  });
});
