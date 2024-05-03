import { render, screen, waitFor } from '@testProvider';
import RolesList from '@src/pages/roles/roles-list/RolesList';
import { defaultRolesList } from '@src/tests/pages/roles/DefaultRole';
import { rolesSetupSuccessAxiosMock } from '@src/tests/pages/roles/RolesMock';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { useOutletContext } from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

jest.mock('@src/pages/roles/roles-list/RolesListHeader', () => jest.fn());

describe('RolesList', () => {
  const mockupPageType = PermissionTypeEnum.ROLES;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  it('renders RolesList correctly', async () => {
    rolesSetupSuccessAxiosMock();
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <RolesList />
      </FeatureFlagContext.Provider>
    );

    await waitFor(() => {
      defaultRolesList.forEach((role) => {
        expect(screen.getByText(role.name)).toBeInTheDocument();
      });
    });

    expect(screen.getAllByTestId(/chipActions/i)).toHaveLength(defaultRolesList.length);
  });

  it('should not have chips if no rights', async () => {
    rolesSetupSuccessAxiosMock();
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(false),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <RolesList />
      </FeatureFlagContext.Provider>
    );

    await waitFor(() => {
      defaultRolesList.forEach((role) => {
        expect(screen.getByText(role.name)).toBeInTheDocument();
      });
    });

    expect(screen.queryAllByTestId(/chipActions/i)).toHaveLength(0);
  });
});
