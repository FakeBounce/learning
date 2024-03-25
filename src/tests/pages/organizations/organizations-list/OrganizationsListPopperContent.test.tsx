import { render, screen, fireEvent, act, cleanup, waitFor } from '@testProvider';
import OrganizationsListPopperContent from '@src/pages/organizations/organizations-list/OrganizationsListPopperContent';
import { defaultOrganization } from '../DefaultOrganization';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import OrganizationsListMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/organizations/organizations-list/OrganizationsListMock';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganizationsListPopperContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders OrganizationsListPopperContent correctly', () => {
    const onCloseMock = jest.fn();
    const setOrganizationSelectedMock = jest.fn();

    render(
      <OrganizationsListPopperContent
        onClose={onCloseMock}
        organizationSelected={null}
        setOrganizationSelected={setOrganizationSelectedMock}
      />
    );

    expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
    expect(screen.getByText(/Modifier/i)).toBeInTheDocument();
    expect(screen.getByText(/Débloquer/i)).toBeInTheDocument();
  });

  it('renders OrganizationsListPopperContent correctly with organization', () => {
    const onCloseMock = jest.fn();
    const setOrganizationSelectedMock = jest.fn();

    render(
      <OrganizationsListPopperContent
        onClose={onCloseMock}
        organizationSelected={defaultOrganization}
        setOrganizationSelected={setOrganizationSelectedMock}
      />
    );

    expect(screen.getByText(/Bloquer/i)).toBeInTheDocument();
  });

  it('navigate on handle button click', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const onCloseMock = jest.fn();
    const setOrganizationSelectedMock = jest.fn();

    render(
      <OrganizationsListPopperContent
        onClose={onCloseMock}
        organizationSelected={defaultOrganization}
        setOrganizationSelected={setOrganizationSelectedMock}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/Modifier/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(`/organizations/update/${defaultOrganization.id}`);
  });

  it("doesn't navigate if no organization", () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const onCloseMock = jest.fn();
    const setOrganizationSelectedMock = jest.fn();

    render(
      <OrganizationsListPopperContent
        onClose={onCloseMock}
        organizationSelected={null}
        setOrganizationSelected={setOrganizationSelectedMock}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/Modifier/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('should change organization and navigate to dashboard on connect click', async () => {
    setupSuccessAxiosMock();
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const onCloseMock = jest.fn();
    const setOrganizationSelectedMock = jest.fn();

    render(
      <OrganizationsListPopperContent
        onClose={onCloseMock}
        organizationSelected={defaultOrganization}
        setOrganizationSelected={setOrganizationSelectedMock}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Se connecter/i));
    });

    expect(OrganizationsListMock.history.post.length).toBe(1);
    expect(OrganizationsListMock.history.post[0].url).toBe('/organizations/change-view/1');

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_DASHBOARD.root);
  });

  it('should display an info if the user is already connected to the organization', async () => {
    setupSuccessAxiosMock();
    const onCloseMock = jest.fn();
    const setOrganizationSelectedMock = jest.fn();

    render(
      <OrganizationsListPopperContent
        onClose={onCloseMock}
        organizationSelected={defaultOrganization}
        setOrganizationSelected={setOrganizationSelectedMock}
      />,
      {
        preloadedState: {
          connectedUser: {
            user: { organizationId: defaultOrganization.id }
          }
        }
      }
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Se connecter/i));
    });

    waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
      expect(screen.getByText(/Vous êtes déjà connecté à cette organisation/i)).toBeInTheDocument();
    });
  });

  // @TODO: Test the toggleBlock when we do the confirmation modal as logic might change
});
