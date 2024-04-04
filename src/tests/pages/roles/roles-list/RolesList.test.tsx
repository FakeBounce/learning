import { setupSuccessAxiosMock } from '@src/tests/pages/roles/roles-list/RolesListMock';
import { render, screen, waitFor } from '@testProvider';
import RolesList from '@src/pages/roles/roles-list/RolesList';
import { defaultRole } from '@src/tests/pages/roles/DefaultRole';

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());
jest.mock('@src/pages/roles/roles-list/RolesListHeader', () => jest.fn());

describe('RolesList', () => {
  it('renders RolesList correctly', async () => {
    setupSuccessAxiosMock();
    render(<RolesList />);

    await waitFor(() => {
      expect(screen.getByText(defaultRole.name)).toBeInTheDocument();
    });
  });
});