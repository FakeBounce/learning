import { render, screen, waitFor } from '@testProvider';
import RolesList from '@src/pages/roles/roles-list/RolesList';
import { defaultRolesList } from '@src/tests/pages/roles/DefaultRole';
import { rolesSetupSuccessAxiosMock } from '@src/tests/pages/roles/RolesMock';

jest.mock('@src/pages/roles/roles-list/RolesListHeader', () => jest.fn());

describe('RolesList', () => {
  it('renders RolesList correctly', async () => {
    rolesSetupSuccessAxiosMock();
    render(<RolesList />);

    await waitFor(() => {
      defaultRolesList.forEach((role) => {
        expect(screen.getByText(role.name)).toBeInTheDocument();
      });
    });
  });
});
