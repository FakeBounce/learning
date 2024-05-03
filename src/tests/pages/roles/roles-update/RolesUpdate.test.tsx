import { render, screen, act, fireEvent, cleanup, waitFor } from '@testProvider';
import { PATH_ROLES } from '@utils/navigation/paths';
import rolesMock, { rolesSetupSuccessAxiosMock } from '@src/tests/pages/roles/RolesMock';
import RolesUpdate from '@src/pages/roles/roles-update/RolesUpdate';
import { Routes, Route } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import { defaultRole } from '@src/tests/pages/roles/DefaultRole';
import { rolesInitialState } from '@redux/reducers/rolesReducer';
import { enqueueSnackbar } from 'notistack';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesCreate', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    rolesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    rolesMock.reset();
  });

  it('should render correctly', () => {
    act(() => {
      render(
        <Routes>
          <Route path={PATH_ROLES.update} element={<RolesUpdate />} />
        </Routes>,
        {
          preloadedState: {
            roles: {
              ...rolesInitialState,
              currentRole: {
                currentRoleData: defaultRole,
                currentRoleLoading: false
              }
            }
          },
          customHistory: [generatePath(PATH_ROLES.update, { roleId: defaultRole.id })]
        }
      );
    });

    const title = screen.getByText(/Modifier un rôle/i);
    expect(title).toBeInTheDocument();
  });

  it('should render navigate back to list if wrong id', async () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    act(() => {
      render(
        <Routes>
          <Route path={PATH_ROLES.update} element={<RolesUpdate />} />
        </Routes>,
        {
          preloadedState: {
            roles: {
              ...rolesInitialState,
              currentRole: {
                currentRoleData: defaultRole,
                currentRoleLoading: false
              }
            }
          },
          customHistory: [generatePath(PATH_ROLES.update, { roleId: 'invalid' })]
        }
      );
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ROLES.root);
    });
  });

  it('should send form data correctly', async () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_ROLES.update} element={<RolesUpdate />} />
        </Routes>,
        {
          preloadedState: {
            roles: {
              ...rolesInitialState,
              currentRole: {
                currentRoleData: defaultRole,
                currentRoleLoading: false
              }
            }
          },
          customHistory: [generatePath(PATH_ROLES.update, { roleId: defaultRole.id })]
        }
      );
    });

    const nameInput = screen.getByLabelText(/Nom du rôle/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByRole('submit');

    await waitFor(() => {
      expect(nameInput).toHaveValue(defaultRole.name);
      expect(descriptionInput).toHaveValue(defaultRole.description);
    });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Test rôle' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(rolesMock.history.put.length).toBe(1);
      expect(rolesMock.history.put[0].data).toBe(
        JSON.stringify({
          name: 'Test rôle',
          description: 'Test Description'
        })
      );
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ROLES.root);
    });
  });

  it("should send a warning if nothing's been touched", async () => {
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_ROLES.update} element={<RolesUpdate />} />
        </Routes>,
        {
          preloadedState: {
            roles: {
              ...rolesInitialState,
              currentRole: {
                currentRoleData: defaultRole,
                currentRoleLoading: false
              }
            }
          },
          customHistory: [generatePath(PATH_ROLES.update, { roleId: defaultRole.id })]
        }
      );
    });

    const nameInput = screen.getByLabelText(/Nom du rôle/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByRole('submit');

    await waitFor(() => {
      expect(nameInput).toHaveValue(defaultRole.name);
      expect(descriptionInput).toHaveValue(defaultRole.description);
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await act(async () => {
      expect(enqueueSnackbar).toHaveBeenCalledWith("Aucune modification n'a été effectuée", {
        variant: 'warning'
      });
    });
  });
});
