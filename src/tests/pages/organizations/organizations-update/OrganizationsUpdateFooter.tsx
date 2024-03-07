import { render, screen, fireEvent } from '@testProvider';
import OrganizationsUpdateFooter from '@src/pages/organizations/organizations-update/OrganizationsUpdateFooter';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock
}));

describe('OrganizationsUpdateFooter', () => {
  it('renders correctly and handles cancel and submit actions', () => {
    render(<OrganizationsUpdateFooter />, {
      preloadedState: {
        organizations: {
          organizationUpdateLoading: false
        }
      }
    });

    // Check if the "Annuler" button is rendered and clickable
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANIZATIONS.root);

    // Check if the "Enregistrer" button is rendered
    const submitButton = screen.getByText(/Enregistrer/i);
    expect(submitButton).toBeInTheDocument();
    // Check if the "Enregistrer" button is clickable
    expect(submitButton).not.toBeDisabled();
  });

  it('renders correctly and handles is disabled when loading is true', () => {
    render(<OrganizationsUpdateFooter />, {
      preloadedState: {
        organizations: {
          organizationUpdateLoading: true
        }
      }
    });

    const submitButton = screen.getByText(/Enregistrer/i);
    expect(submitButton).toBeInTheDocument();
    // Check if the "Enregistrer" button is disabled
    expect(submitButton).toBeDisabled();
  });
});
