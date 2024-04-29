import { render, screen, act, renderHook } from '@testProvider';
import GroupsForm from '@src/pages/groups/GroupsForm';
import { FormProvider, useForm } from 'react-hook-form';

jest.mock('@src/pages/groups/GroupsUsersList', () => ({
  __esModule: true,
  default: () => <div>GroupsUsersList</div>
}));

describe('GroupsForm', () => {
  it('should render GroupsForm correctly', async () => {
    const methods = renderHook(() => useForm()).result.current;
    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <GroupsForm />
          </form>
        </FormProvider>
      );
    });

    expect(screen.getByLabelText(/Nom du groupe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });
});
