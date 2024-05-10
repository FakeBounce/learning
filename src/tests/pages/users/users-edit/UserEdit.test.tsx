import { render, screen, waitFor, cleanup, fireEvent, act } from '@testProvider';
import UserEdit from '@src/pages/users/users-edit/UserEdit';
import UsersMock, { usersSetupSuccessAxiosMock } from '@src/tests/pages/users/UsersMock';
import { generatePath, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Route, Routes } from 'react-router';
import { PATH_ERRORS, PATH_USERS } from '@utils/navigation/paths';
import { defaultUser, defaultUsersList } from '@src/tests/pages/users/DefaultUsers';

const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('UserEditForm', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    usersSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    UsersMock.reset();
  });

  it('renders UserEditForm correctly', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_USERS.update} element={<UserEdit />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_USERS.update, { userId: defaultUsersList[0].id })]
        }
      );
    });

    expect(screen.getByText(/Modifier un utilisateur/i)).toBeInTheDocument();
  });

  it('should display a message if form is untouched', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_USERS.update} element={<UserEdit />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_USERS.update, { userId: defaultUsersList[0].id })]
        }
      );
    });

    expect(screen.getByRole('submit')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(enqueueSnackbar("Aucune modification n'a été apportée", { variant: 'warning' }));
    });
  });

  it('should send back to list if invalid id', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_USERS.update} element={<UserEdit />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_USERS.update, { userId: 'invalid' })]
        }
      );
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ERRORS.root);
    });
  });

  it('should send form correctly', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_USERS.update} element={<UserEdit />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_USERS.update, { userId: defaultUser.id })]
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(defaultUser.firstname);
      expect(screen.getByLabelText(/Email/i)).toHaveValue(defaultUser.email);
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: 'Testing' } });
      fireEvent.change(screen.getByLabelText(/Login/i), { target: { value: 'User' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(UsersMock.history.put.length).toBe(1);

      expect(UsersMock.history.put[0].data).toBe(
        JSON.stringify({
          firstname: 'Testing',
          login: 'User'
        })
      );

      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_USERS.profile, { userId: String(defaultUser.id) })
      );
    });
  });
});
