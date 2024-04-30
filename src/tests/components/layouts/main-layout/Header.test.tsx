import { render, screen, fireEvent, act } from '@testProvider';
import Header from '@src/components/layouts/main-layout/Header';
import { useNavigate } from 'react-router-dom';
import { waitFor } from '@testing-library/dom';
import HeaderMock, {
  headerSetupSuccessAxiosMock
} from '@src/tests/components/layouts/main-layout/HeaderMock';
import { PATH_DASHBOARD } from '@utils/navigation/paths';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock(
  '@src/components/layouts/main-layout/HeaderRightContent',
  () => () => 'HeaderRightContent'
);
jest.mock('@src/components/layouts/main-layout/HeaderBreadcrumbs', () => () => 'HeaderBreadcrumbs');

describe('Header', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders organization name and logout chip for super admin', async () => {
    headerSetupSuccessAxiosMock();

    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<Header />, {
      preloadedState: {
        connectedUser: {
          user: {
            mainOrganizationId: '123',
            currentOrganization: { name: 'My Org', isMain: false },
            isSuperAdmin: true
          }
        }
      }
    });

    expect(screen.getByText('My Org')).toBeInTheDocument();
    expect(screen.queryByText('(global)')).not.toBeInTheDocument();
    const logoutChip = screen.getByTestId('CancelIcon');
    expect(logoutChip).toBeInTheDocument();

    await act(async () => {
      // Test logout functionality
      fireEvent.click(logoutChip);
    });

    await waitFor(() => {
      expect(HeaderMock.history.post.length).toBe(1);
      expect(HeaderMock.history.post[0].url).toBe('/organizations/123/change-view');
      expect(navigateMock).toHaveBeenCalledWith(PATH_DASHBOARD.root);
    });
  });

  it('does not show logout chip nor global for classic user', () => {
    render(<Header />, {
      preloadedState: {
        connectedUser: {
          user: {
            mainOrganizationId: '123',
            currentOrganization: { name: 'My Org', isMain: false },
            isSuperAdmin: false
          }
        }
      }
    });
    expect(screen.queryByText('(global)')).not.toBeInTheDocument();
    expect(screen.queryByText('Déconnexion')).not.toBeInTheDocument();
  });

  it('does not show logout chip for main organization', () => {
    render(<Header />, {
      preloadedState: {
        connectedUser: {
          user: {
            mainOrganizationId: '123',
            currentOrganization: { name: 'My Org', isMain: true },
            isSuperAdmin: true
          }
        }
      }
    });
    expect(screen.queryByText('(global)')).toBeInTheDocument();
    expect(screen.queryByText('Déconnexion')).not.toBeInTheDocument();
  });
});
