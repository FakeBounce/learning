import OrganizationsUpdateMock, {
  setupSuccessAxiosMock,
  setupErrorAxiosMock
} from '@src/tests/pages/organizations/organizations-update/OrganizationsUpdateMock';
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testProvider';
import OrganizationsUpdate from '@src/pages/organizations/organizations-update/OrganizationsUpdate';
import { PATH_PARAMETERS } from '@utils/navigation/paths';

describe('OrganizationsUpdate', () => {
  beforeEach(() => {
    setupSuccessAxiosMock();
  });
  afterEach(() => {
    // Clear the Axios mock
    OrganizationsUpdateMock.reset();
    cleanup();
  });

  it('renders correctly and handles form submission', async () => {
    setupSuccessAxiosMock();

    render(<OrganizationsUpdate />, {
      preloadedState: {
        organizations: {
          organizationUpdate: {
            organizationUpdateLoading: false
          },
          currentOrganization: {
            currentOrganizationData: null,
            currentOrganizationLoading: false
          }
        }
      },
      customHistory: [`/${PATH_PARAMETERS.organizations}/update/1`]
    });

    // Check if the "Modifier une organisation" header is rendered
    expect(screen.getByText(/Modifier une organisation/i)).toBeInTheDocument();

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Nom \*/i)).toHaveValue('Test Organisation');
    });

    await act(() => {
      fireEvent.input(screen.getByLabelText(/Nom \*/i), {
        target: { value: 'New test Organisation' }
      });
    });

    // Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for form submission to complete
    await waitFor(() => {
      // Check if updateOrganizations and getSingleOrganization were called with the expected arguments
      expect(OrganizationsUpdateMock.history.put.length).toBe(1);
      expect(screen.getByText('Organisation enregistrée !')).toBeInTheDocument();
    });
  });

  it('handles form submission with no changes', async () => {
    render(<OrganizationsUpdate />, {
      preloadedState: {
        organizations: {
          organizationUpdate: {
            organizationUpdateLoading: false
          },
          currentOrganization: {
            currentOrganizationData: null,
            currentOrganizationLoading: false
          }
        }
      },
      customHistory: [`/${PATH_PARAMETERS.organizations}/update/1`]
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Nom \*/i)).toHaveValue('Test Organisation');
    });

    // Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for form submission to complete
    await waitFor(() => {
      expect(screen.getByText("Aucune modification n'a été effectuée")).toBeInTheDocument();
      // Check if updateOrganizations and getSingleOrganization were called with the expected arguments
      expect(OrganizationsUpdateMock.history.put.length).toBe(0);
    });
  });

  it('handles axios errors', async () => {
    setupErrorAxiosMock();
    render(<OrganizationsUpdate />, {
      preloadedState: {
        organizations: {
          organizationUpdate: {
            organizationUpdateLoading: false
          },
          currentOrganization: {
            currentOrganizationData: null,
            currentOrganizationLoading: false
          }
        }
      },
      customHistory: [`/${PATH_PARAMETERS.organizations}/update/1`]
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Nom \*/i)).toHaveValue('Test Organisation');
    });

    await act(() => {
      fireEvent.input(screen.getByLabelText(/Nom \*/i), {
        target: { value: 'New test Organisation' }
      });

      // Simulate form submission
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for form submission to complete
    await waitFor(() => {
      // Check if enqueueSnackbar was called with the expected warning message
      expect(
        screen.getByText('An error occurred while updating the organization. Please try again.')
      ).toBeInTheDocument();
    });
  });
});
