import { render, screen } from '@testProvider';
import SidebarUser from '@src/components/layouts/sidebar/SidebarUser';
import {
  connectedUserClientAdmin,
  connectedUserSuperAdmin,
  defaultConnectedUser
} from '@src/tests/components/layouts/sidebar/DefaultSidebar';
import { ConnectedUser } from '@services/connected-user/interfaces';

const SidebarUserConfig = (user: ConnectedUser) => {
  return {
    preloadedState: {
      connectedUser: {
        user
      }
    }
  };
};

describe('connected user informations', () => {
  it('should render connected user information correctly when drawer is open', async () => {
    render(<SidebarUser open={true} />, SidebarUserConfig(defaultConnectedUser));

    const connectedUserAbbreviation = `${defaultConnectedUser.lastname.charAt(
      0
    )}${defaultConnectedUser.firstname.charAt(0)}`;
    const connectedUserName = `${defaultConnectedUser.lastname} ${defaultConnectedUser.firstname}`;
    expect(screen.getByText(connectedUserAbbreviation)).toBeInTheDocument();
    expect(screen.getByText(connectedUserName)).toBeInTheDocument();
    expect(screen.queryByText(/Client Admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Super Admin/i)).not.toBeInTheDocument();
  });

  it('should display client admin if he is', async () => {
    render(<SidebarUser open={true} />, SidebarUserConfig(connectedUserClientAdmin));

    const connectedUserAbbreviation = `${connectedUserClientAdmin.lastname.charAt(
      0
    )}${connectedUserClientAdmin.firstname.charAt(0)}`;
    const connectedUserName = `${connectedUserClientAdmin.lastname} ${connectedUserClientAdmin.firstname}`;
    expect(screen.getByText(connectedUserAbbreviation)).toBeInTheDocument();
    expect(screen.getByText(connectedUserName)).toBeInTheDocument();
    expect(screen.getByText(/Client Admin/i)).toBeInTheDocument();
    expect(screen.queryByText(/Super Admin/i)).not.toBeInTheDocument();
  });
  it('should display super admin if he is', async () => {
    render(<SidebarUser open={true} />, SidebarUserConfig(connectedUserSuperAdmin));

    const connectedUserAbbreviation = `${connectedUserSuperAdmin.lastname.charAt(
      0
    )}${connectedUserSuperAdmin.firstname.charAt(0)}`;
    const connectedUserName = `${connectedUserSuperAdmin.lastname} ${connectedUserSuperAdmin.firstname}`;
    expect(screen.getByText(connectedUserAbbreviation)).toBeInTheDocument();
    expect(screen.getByText(connectedUserName)).toBeInTheDocument();
    expect(screen.queryByText(/Client Admin/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Super Admin/i)).toBeInTheDocument();
  });
});
