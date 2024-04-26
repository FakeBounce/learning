import { render, screen, waitFor } from '@testProvider';
import OrganizationsList from '@src/pages/organizations/organizations-list/OrganizationsList';
import {
  blockedOrganization,
  defaultOrganization,
  newOrganization,
  unlockedOrganization
} from '@src/tests/pages/organizations/DefaultOrganization';
import { setupSuccessAxiosMock } from '@src/tests/pages/organizations/organizations-list/OrganizationsListMock';

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
