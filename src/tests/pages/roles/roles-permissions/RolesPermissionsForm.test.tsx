import { render, screen, waitFor, cleanup, renderHook } from '@testProvider';
import { FormProvider, useForm } from 'react-hook-form';
import RolesPermissionsForm from '@src/pages/roles/roles-permissions/RolesPermissionsForm';
import {
  translatePermissionsEnum,
  translatePermissionsTypeEnum
} from '@utils/helpers/translatePermissions';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';

describe('RolesPermissionsForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const methods = renderHook(() => useForm()).result.current;

    waitFor(() => {
      render(
        <FormProvider {...methods}>
          <form>
            <RolesPermissionsForm />
          </form>
        </FormProvider>
      );
    });

    expect(
      screen.getByLabelText(
        translatePermissionsEnum(PermissionTypeEnum.COURSES, PermissionEnum.CREATE)
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        translatePermissionsEnum(PermissionTypeEnum.MODULES, PermissionEnum.CREATE)
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(translatePermissionsTypeEnum(PermissionTypeEnum.USERS))
    ).toBeInTheDocument();
    expect(
      screen.getByText(translatePermissionsTypeEnum(PermissionTypeEnum.ROLES))
    ).toBeInTheDocument();
  });
});
