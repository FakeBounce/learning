import { render, screen, cleanup } from '@testProvider';
import RolesListPopperContent from '@src/pages/roles/roles-list/RolesListPopperContent';
import { defaultAdminRole, defaultRole } from '@src/tests/pages/roles/DefaultRole';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { useOutletContext } from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesListPopperContent', () => {
  const mockupPageType = PermissionTypeEnum.ROLES;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders RolesListPopperContent correctly', () => {
    const handleDelete = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <RolesListPopperContent roleSelected={defaultRole} handleDelete={handleDelete} />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Modifier les utilisateurs/i)).toBeInTheDocument();
    expect(screen.getByText(/Gérer les permissions/i)).toBeInTheDocument();
    expect(screen.getByText(/Supprimer/i)).toBeInTheDocument();
  });

  it('should not show delete for admin', () => {
    const handleDelete = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <RolesListPopperContent roleSelected={defaultAdminRole} handleDelete={handleDelete} />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Modifier les utilisateurs/i)).toBeInTheDocument();
    expect(screen.getByText(/Gérer les permissions/i)).toBeInTheDocument();
    expect(screen.queryByText(/Supprimer/i)).not.toBeInTheDocument();
  });

  it('should not show buttons if no rights', () => {
    const handleDelete = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(false),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <RolesListPopperContent roleSelected={defaultRole} handleDelete={handleDelete} />
      </FeatureFlagContext.Provider>
    );

    expect(screen.queryByText(/Modifier les utilisateurs/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gérer les permissions/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Supprimer/i)).not.toBeInTheDocument();
  });

  it('should show only delete if has rights', () => {
    const handleDelete = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockImplementation((pageType, permission) => {
            return pageType === mockupPageType && permission === PermissionEnum.DELETE;
          }),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <RolesListPopperContent roleSelected={defaultRole} handleDelete={handleDelete} />
      </FeatureFlagContext.Provider>
    );

    expect(screen.queryByText(/Modifier les utilisateurs/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gérer les permissions/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Supprimer/i)).toBeInTheDocument();
  });
});
