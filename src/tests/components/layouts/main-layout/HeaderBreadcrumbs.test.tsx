import { render, screen } from '@testProvider';
import HeaderBreadcrumbs from '@src/components/layouts/main-layout/HeaderBreadcrumbs';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Import actual functionalities
  NavLink: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
  useLocation: jest.fn()
}));

jest.mock('@utils/navigation/configNavigation', () => ({
  globalNavigationConfig: [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Settings', path: '/dashboard/settings' },
    { title: 'Project Settings', path: '/dashboard/settings/:projectId' }
  ]
}));

describe('HeaderBreadcrumbs', () => {
  it('should display the correct breadcrumbs for the root path', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    render(<HeaderBreadcrumbs />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should display the correct breadcrumbs for nested paths (1)', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard' });
    render(<HeaderBreadcrumbs />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should display the correct breadcrumbs for nested paths (2)', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/settings' });
    render(<HeaderBreadcrumbs />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('handles non-configured paths gracefully', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/unknown/path' });
    render(<HeaderBreadcrumbs />);

    // Verify that no breadcrumbs are rendered for unknown paths
    expect(screen.queryByText('Unknown')).not.toBeInTheDocument();
    expect(screen.queryByText('Path')).not.toBeInTheDocument();
  });

  it('should display the correct breadcrumbs for parameterized paths', () => {
    // Mock `useLocation` to return a parameterized path
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/settings/123' });

    render(<HeaderBreadcrumbs />);

    // Check for breadcrumb items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Project Settings')).toBeInTheDocument();

    // You can also check the links if necessary
    const settingsLink = screen.getByText('Project Settings').closest('a');
    expect(settingsLink).toHaveAttribute('href', '/dashboard/settings/123');
  });
});
