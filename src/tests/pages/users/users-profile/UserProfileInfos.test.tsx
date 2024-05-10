import { render, screen } from '@testProvider';
import { defaultDoubleAuthUser, defaultUser } from '@src/tests/pages/users/DefaultUsers';
import UserProfileInfos from '@src/pages/users/users-profile/UserProfileInfos';

describe('UserProfileInfos', () => {
  it('renders UserProfileInfos correctly', () => {
    render(<UserProfileInfos />, {
      preloadedState: {
        users: {
          singleUser: {
            singleUserData: defaultDoubleAuthUser,
            singleUserLoading: false
          }
        }
      }
    });

    expect(screen.getByText(defaultDoubleAuthUser.lastname)).toBeInTheDocument();
    expect(screen.getByText(defaultDoubleAuthUser.email)).toBeInTheDocument();
    expect(screen.getByText(/OUI/i)).toBeInTheDocument();
  });

  it('should display no if no doubleAuth', () => {
    render(<UserProfileInfos />, {
      preloadedState: {
        users: {
          singleUser: {
            singleUserData: defaultUser,
            singleUserLoading: false
          }
        }
      }
    });

    expect(screen.getByText(defaultUser.lastname)).toBeInTheDocument();
    expect(screen.getByText(defaultUser.email)).toBeInTheDocument();
    expect(screen.getByText(/Non/i)).toBeInTheDocument();
  });
});
