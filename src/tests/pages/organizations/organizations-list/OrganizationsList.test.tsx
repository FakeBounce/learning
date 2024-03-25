import { render, screen, waitFor } from '@testProvider';
import OrganizationsList from '@src/pages/organizations/organizations-list/OrganizationsList';
import {
  blockedOrganization,
  defaultOrganization,
  newOrganization,
  unlockedOrganization
} from '@src/tests/pages/organizations/DefaultOrganization';
import { setupSuccessAxiosMock } from '@src/tests/pages/organizations/organizations-list/OrganizationsListMock';

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());

describe('OrganizationsList', () => {
  it('renders OrganizationsList correctly', async () => {
    setupSuccessAxiosMock();
    render(<OrganizationsList />);

    await waitFor(() => {
      expect(screen.getByText(defaultOrganization.name)).toBeInTheDocument();
      expect(screen.getByText(newOrganization.name)).toBeInTheDocument();
      expect(screen.getByText(blockedOrganization.name)).toBeInTheDocument();
      expect(screen.getByText(unlockedOrganization.name)).toBeInTheDocument();
    });
  });
});
