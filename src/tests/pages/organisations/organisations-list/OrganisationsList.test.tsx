import { render, screen, waitFor } from '@testProvider';
import OrganisationsList from '@src/pages/organisations/organisations-list/OrganisationsList';
import {
  blockedOrganisation,
  defaultOrganisation,
  newOrganisation,
  unlockedOrganisation
} from '@src/tests/pages/organisations/DefaultOrganisation';

describe('OrganisationsList', () => {
  it('renders OrganisationsList correctly', () => {
    // Render the OrganisationsCreateFooter component
    render(<OrganisationsList />);

    waitFor(() => {
      expect(screen.getByText(defaultOrganisation.name)).toBeInTheDocument();
      expect(screen.getByText(newOrganisation.name)).toBeInTheDocument();
      expect(screen.getByText(blockedOrganisation.name)).toBeInTheDocument();
      expect(screen.getByText(unlockedOrganisation.name)).toBeInTheDocument();
    });
  });
});
