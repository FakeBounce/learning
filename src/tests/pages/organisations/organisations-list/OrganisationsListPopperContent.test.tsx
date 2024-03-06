import { render, screen, fireEvent, act, cleanup, waitFor } from '@testProvider';
import OrganisationsListPopperContent from '@src/pages/organisations/organisations-list/OrganisationsListPopperContent';
import { defaultOrganisation } from '../DefaultOrganisation';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import OrganisationsListMock from '@src/tests/pages/organisations/organisations-list/OrganisationsListMock';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganisationsListPopperContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders OrganisationsListPopperContent correctly', () => {
    const onCloseMock = jest.fn();
    const setOrganisationSelectedMock = jest.fn();

    // Render the OrganisationsCreateFooter component
    render(
      <OrganisationsListPopperContent
        onClose={onCloseMock}
        organisationSelected={null}
        setOrganisationSelected={setOrganisationSelectedMock}
      />
    );

    expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
    expect(screen.getByText(/Modifier/i)).toBeInTheDocument();
    expect(screen.getByText(/Débloquer/i)).toBeInTheDocument();
  });

  it('renders OrganisationsListPopperContent correctly with organisation', () => {
    const onCloseMock = jest.fn();
    const setOrganisationSelectedMock = jest.fn();

    // Render the OrganisationsCreateFooter component
    render(
      <OrganisationsListPopperContent
        onClose={onCloseMock}
        organisationSelected={defaultOrganisation}
        setOrganisationSelected={setOrganisationSelectedMock}
      />
    );

    expect(screen.getByText(/Bloquer/i)).toBeInTheDocument();
  });

  it('navigate on handle button click', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const onCloseMock = jest.fn();
    const setOrganisationSelectedMock = jest.fn();

    // Render the OrganisationsCreateFooter component
    render(
      <OrganisationsListPopperContent
        onClose={onCloseMock}
        organisationSelected={defaultOrganisation}
        setOrganisationSelected={setOrganisationSelectedMock}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/Modifier/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(`/organisations/update/${defaultOrganisation.id}`);
  });

  it("doesn't navigate if no organisation", () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const onCloseMock = jest.fn();
    const setOrganisationSelectedMock = jest.fn();

    // Render the OrganisationsCreateFooter component
    render(
      <OrganisationsListPopperContent
        onClose={onCloseMock}
        organisationSelected={null}
        setOrganisationSelected={setOrganisationSelectedMock}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/Modifier/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('should change organization and navigate to dashboard on connect click', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const onCloseMock = jest.fn();
    const setOrganisationSelectedMock = jest.fn();

    // Render the OrganisationsCreateFooter component
    render(
      <OrganisationsListPopperContent
        onClose={onCloseMock}
        organisationSelected={defaultOrganisation}
        setOrganisationSelected={setOrganisationSelectedMock}
      />,
      {
        preloadedState: {
          connectedUser: {
            organisationId: null
          }
        }
      }
    );

    fireEvent.click(screen.getByText(/Se connecter/i));

    expect(OrganisationsListMock.history.post.length).toBe(1);
    expect(OrganisationsListMock.history.post[0].url).toBe('/organizations/change-view/1');

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_DASHBOARD.root);
  });

  it('should display an info if the user is already connected to the organisation', () => {
    const onCloseMock = jest.fn();
    const setOrganisationSelectedMock = jest.fn();

    // Render the OrganisationsCreateFooter component
    render(
      <OrganisationsListPopperContent
        onClose={onCloseMock}
        organisationSelected={defaultOrganisation}
        setOrganisationSelected={setOrganisationSelectedMock}
      />,
      {
        preloadedState: {
          connectedUser: {
            organisationId: defaultOrganisation.id
          }
        }
      }
    );

    fireEvent.click(screen.getByText(/Se connecter/i));

    waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
      expect(screen.getByText(/Vous êtes déjà connecté à cette organisation/i)).toBeInTheDocument();
    });
  });

  // @TODO: Test the toggleBlock when we do the confirmation modal as logic might change
});
