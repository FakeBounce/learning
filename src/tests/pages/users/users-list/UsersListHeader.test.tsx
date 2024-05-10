import { useNavigate } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testProvider';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PATH_USERS } from '@utils/navigation/paths';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import UsersListHeader from '@src/pages/users/users-list/UsersListHeader';

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
        <UsersListHeader />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Utilisateurs/i)).toBeInTheDocument();
  });

  it('should navigate to actions', () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UsersListHeader />
      </FeatureFlagContext.Provider>
    );

    const createButton = screen.getByText('Ajouter');
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    expect(navigateMock).toHaveBeenCalledWith(PATH_USERS.add);

    const createBulkButton = screen.getByText(/Ajouter en masse/i);
    expect(createBulkButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createBulkButton);
    });

    expect(navigateMock).toHaveBeenCalledWith(PATH_USERS.addBulk);
  });

  it('should display no action if no rights', () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(false),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <UsersListHeader />
      </FeatureFlagContext.Provider>
    );

    const createButton = screen.queryByText(/Ajouter/i);
    expect(createButton).not.toBeInTheDocument();

    const createBulkButton = screen.queryByText(/Ajouter en masse/i);
    expect(createBulkButton).not.toBeInTheDocument();
  });
});
