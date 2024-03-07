import { render, screen, fireEvent } from '@testProvider';
import OrganisationsUpdateFooter from '@src/pages/organisations/organisations-update/OrganisationsUpdateFooter';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock
}));

describe('OrganisationsUpdateFooter', () => {
  it('renders correctly and handles cancel and submit actions', () => {
    render(<OrganisationsUpdateFooter />, {
      preloadedState: {
        organisations: {
          organisationUpdateLoading: false
        }
      }
    });

    // Check if the "Annuler" button is rendered and clickable
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANISATIONS.root);

    // Check if the "Enregistrer" button is rendered
    const submitButton = screen.getByText(/Enregistrer/i);
    expect(submitButton).toBeInTheDocument();
    // Check if the "Enregistrer" button is clickable
    expect(submitButton).not.toBeDisabled();
  });

  it('renders correctly and handles is disabled when loading is true', () => {
    render(<OrganisationsUpdateFooter />, {
      preloadedState: {
        organisations: {
          organisationUpdateLoading: true
        }
      }
    });

    const submitButton = screen.getByText(/Enregistrer/i);
    expect(submitButton).toBeInTheDocument();
    // Check if the "Enregistrer" button is disabled
    expect(submitButton).toBeDisabled();
  });
});
