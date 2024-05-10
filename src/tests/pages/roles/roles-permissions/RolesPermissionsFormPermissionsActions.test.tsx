import { render, screen, waitFor, cleanup, renderHook } from '@testProvider';
import RolesPermissionsFormPermissionsActions from '@src/pages/roles/roles-permissions/RolesPermissionsFormPermissionsActions';
import { FormProvider, useForm } from 'react-hook-form';

describe('RolesPermissionsFormPermissionsActions', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const methods = renderHook(() => useForm()).result.current;

    waitFor(() => {
      render(
        <FormProvider {...methods}>
          <form>
            <RolesPermissionsFormPermissionsActions label={'Some label'} name={'some-name'} />
          </form>
        </FormProvider>
      );
    });

    const labeledSwitch = screen.getByLabelText(/Some label/i);
    expect(labeledSwitch).toBeInTheDocument();
  });
});
