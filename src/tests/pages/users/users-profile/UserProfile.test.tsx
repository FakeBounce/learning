import { generatePath, useNavigate } from 'react-router-dom';
import { render, screen, waitFor, cleanup } from '@testProvider';
import { PATH_ERRORS, PATH_USERS } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import UserProfile from '@src/pages/users/users-profile/UserProfile';
import { defaultUser } from '@src/tests/pages/users/DefaultUsers';
import UsersMock, { usersSetupSuccessAxiosMock } from '@src/tests/pages/users/UsersMock';

// Mock useNavigate
const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('@src/pages/users/users-profile/UserProfileHeader', () => jest.fn());

describe('UserProfile', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    usersSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    UsersMock.reset();
  });

  it('renders UserProfile correctly', async () => {
    await waitFor(async () => {
      render(
        <Routes>
          <Route path={PATH_USERS.profile} element={<UserProfile />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_USERS.profile, { userId: defaultUser.id })] // Cause the mock return defaultUsersList[0]
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByText(defaultUser.email)).toBeInTheDocument();
      expect(screen.getByText(defaultUser.lastname)).toBeInTheDocument();
    });
  });

  it('navigates if invalid id', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_USERS.profile} element={<UserProfile />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_USERS.profile, { userId: 'invalid' })]
        }
      );
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ERRORS.root);
    });
  });
});
