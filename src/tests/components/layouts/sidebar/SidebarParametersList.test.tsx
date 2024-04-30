import { render, screen } from '@testProvider';
import SidebarParametersList from '@src/components/layouts/sidebar/SidebarParametersList';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

describe('SidebarParametersList', () => {
  it('should display just an icon if closed', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <SidebarParametersList open={false} />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should not display any list items if canSeePage is false', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(false)
        }}
      >
        <SidebarParametersList open={true} />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Paramètres/i)).toBeInTheDocument();
    // Checks if the list is present but empty
    const list = screen.queryByRole('list');
    expect(list).toBeInTheDocument();
    expect(list?.children).toHaveLength(0);
  });

  it('should display list items if canSeePage is true', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <SidebarParametersList open={true} />
      </FeatureFlagContext.Provider>
    );

    // Checks if list items are present and counts them
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });
});
