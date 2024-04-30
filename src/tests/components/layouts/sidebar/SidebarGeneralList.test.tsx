import { render, screen } from '@testProvider';
import SidebarGeneralList from '@src/components/layouts/sidebar/SidebarGeneralList';
import { generalNavigationConfig } from '@utils/navigation/configNavigation';

describe('SidebarGeneralList', () => {
  it('should display only icons if closed', () => {
    render(<SidebarGeneralList open={false} />);

    generalNavigationConfig.forEach((item) => {
      expect(screen.getByTestId(`icon-${item.path}`)).toBeInTheDocument();
    });
    expect(screen.getByText(/General/i)).toHaveStyle('visibility: hidden');
  });

  it('should display icons and text if open', () => {
    render(<SidebarGeneralList open={true} />);

    expect(screen.getByText(/General/i)).not.toHaveStyle('visibility: hidden');
    generalNavigationConfig.forEach((item) => {
      expect(screen.getByTestId(`icon-${item.path}`)).toBeInTheDocument();
    });
  });
});
