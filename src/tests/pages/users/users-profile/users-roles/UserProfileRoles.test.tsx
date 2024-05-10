import { render, screen } from '@testProvider';
import { defaultRolelessUser, defaultUsersList } from '@src/tests/pages/users/DefaultUsers';
import UserProfileRoles from '@src/pages/users/users-profile/users-roles/UserProfileRoles';

describe('UserProfileRoles', () => {
  it('renders UserProfileRoles correctly', () => {
    render(<UserProfileRoles />, {
      preloadedState: {
        users: {
          singleUser: {
            singleUserData: defaultUsersList[0],
            singleUserLoading: false
          }
        }
      }
    });

    expect(screen.getByText(/Rôles/i)).toBeInTheDocument();
    expect(screen.getByText(defaultUsersList[0].roles[0].name)).toBeInTheDocument();
  });

  it('renders a default text if groups are empty', () => {
    render(<UserProfileRoles />, {
      preloadedState: {
        users: {
          singleUser: {
            singleUserData: defaultRolelessUser,
            singleUserLoading: false
          }
        }
      }
    });

    expect(screen.getByText(/Rôles/i)).toBeInTheDocument();
    expect(screen.getByText(/Aucun rôle défini./i)).toBeInTheDocument();
  });
});
