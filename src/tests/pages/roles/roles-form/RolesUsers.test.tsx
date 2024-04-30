import { render, screen, act, renderHook } from '@testProvider';
import RolesUsersForm from '@src/pages/roles/roles-form/RolesUsersForm';
import { FormProvider, useForm } from 'react-hook-form';

jest.mock('@src/pages/roles/roles-form/RolesUsersList', () => ({
  __esModule: true,
  default: () => <div>RolesUsersList</div>
}));

describe('RolesUsersForm', () => {
  it('should render RolesUsersForm correctly', async () => {
    const methods = renderHook(() => useForm()).result.current;
    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <RolesUsersForm />
          </form>
        </FormProvider>
      );
    });

    expect(screen.getByLabelText(/Nom du rôle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it('should display a skeleton if loading', async () => {
    const methods = renderHook(() => useForm()).result.current;
    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <RolesUsersForm />
          </form>
        </FormProvider>,
        {
          preloadedState: {
            roles: {
              rolesUpdate: {
                rolesUpdateLoading: true
              }
            }
          }
        }
      );
    });

    expect(screen.queryByText(/Nom du rôle/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Description/i)).not.toBeInTheDocument();
  });
});
