import { render, screen } from '@testProvider';
import UserProfileGroups from '@src/pages/users/users-profile/users-groups/UserProfileGroups';
import { defaultGrouplessUser, defaultUsersList } from '@src/tests/pages/users/DefaultUsers';

describe('UserProfileGroups', () => {
  it('renders UserProfileGroups correctly', () => {
    render(<UserProfileGroups />, {
      preloadedState: {
        users: {
          singleUser: {
            singleUserData: defaultUsersList[0],
            singleUserLoading: false
          }
        }
      }
    });

    expect(screen.getByText(/Groupes/i)).toBeInTheDocument();
    expect(screen.getByText(defaultUsersList[0].groups[0].name)).toBeInTheDocument();
  });

  it('renders a default text if groups are empty', () => {
    render(<UserProfileGroups />, {
      preloadedState: {
        users: {
          singleUser: {
            singleUserData: defaultGrouplessUser,
            singleUserLoading: false
          }
        }
      }
    });

    expect(screen.getByText(/Groupes/i)).toBeInTheDocument();
    expect(screen.getByText(/Aucun groupe défini./i)).toBeInTheDocument();
  });
});
