import { render, screen, waitFor, cleanup, act, fireEvent } from '@testProvider';
import { translatePermissionsEnum } from '@utils/helpers/translatePermissions';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import RolesPermissions from '@src/pages/roles/roles-permissions/RolesPermissions';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_ERRORS, PATH_ROLES } from '@utils/navigation/paths';
import RolesMock, { rolesSetupSuccessAxiosMock } from '@src/tests/pages/roles/RolesMock';
import { Route, Routes } from 'react-router';

const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesPermissionsForm', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    rolesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    RolesMock.reset();
    jest.resetAllMocks();
  });

  it('should render properly', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_ROLES.managePermission} element={<RolesPermissions />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_ROLES.managePermission, { roleId: '1' })]
        }
      );
    });

    expect(
      screen.getByLabelText(
        translatePermissionsEnum(PermissionTypeEnum.COURSES, PermissionEnum.CREATE)
      )
    ).toBeInTheDocument();
  });

  it('should send form data', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_ROLES.managePermission} element={<RolesPermissions />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_ROLES.managePermission, { roleId: '1' })]
        }
      );
    });

    const coursesCreateSwitch = screen.getByLabelText(
      translatePermissionsEnum(PermissionTypeEnum.COURSES, PermissionEnum.CREATE)
    );
    const submitButton = screen.getByRole('submit');
    expect(coursesCreateSwitch).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(coursesCreateSwitch);
      fireEvent.click(submitButton);
    });

    expect(RolesMock.history.put.length).toBe(1);
    expect(RolesMock.history.put[0].data).toBe(
      JSON.stringify({
        permissions: {
          see_personalization: false,
          add_users: false,
          see_users: false,
          update_users: false,
          add_mass_users: false,
          block_users: false,
          add_testers: false,
          update_testers: false,
          add_mass_testers: false,
          block_testers: false,
          add_students: false,
          update_students: false,
          add_mass_students: false,
          block_students: false,
          add_roles: false,
          see_roles: false,
          update_roles: false,
          delete_roles: false,
          add_groups: false,
          see_groups: false,
          update_groups: false,
          delete_groups: false,
          add_modules: false,
          add_courses: true,
          see_stats: false
        }
      })
    );

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ROLES.root);
    });
  });

  it('should navigate to error if invalid id', async () => {
    await waitFor(() => {
      render(
        <Routes>
          <Route path={PATH_ROLES.managePermission} element={<RolesPermissions />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_ROLES.managePermission, { roleId: 'invalid' })]
        }
      );
    });

    expect(
      screen.getByLabelText(
        translatePermissionsEnum(PermissionTypeEnum.COURSES, PermissionEnum.CREATE)
      )
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ERRORS.root);
    });
  });
});
