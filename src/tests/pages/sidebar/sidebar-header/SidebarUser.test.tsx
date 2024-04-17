import { render, screen } from '@testProvider';
import SidebarUser from '@src/components/layouts/sidebar/SidebarUser';
import { defaultConnectedUser } from '@src/tests/pages/sidebar/DefaultSidebar';

describe('connected user informations', () => {
  it('should render connected user information correctly when drawer is open', async () => {
    render(<SidebarUser open={true} />, {
      preloadedState: {
        connectedUser: {
          user: defaultConnectedUser
        }
      }
    });

    expect(
      screen.getByText(
        `${defaultConnectedUser.lastname.charAt(0)}${defaultConnectedUser.firstname.charAt(0)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultConnectedUser.lastname} ${defaultConnectedUser.firstname}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        defaultConnectedUser.isSuperAdmin
          ? /SuperAdmin/i
          : defaultConnectedUser.isClientAdmin
          ? /ClientAdmin/i
          : ''
      )
    ).toBeInTheDocument();
  });
});
