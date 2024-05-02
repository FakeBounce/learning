import { render, screen, act, renderHook } from '@testProvider';
import GroupsForm from '@src/pages/groups/groups-form/GroupsForm';
import { FormProvider, useForm } from 'react-hook-form';

jest.mock('@src/components/table/TableUsersList', () => ({
  __esModule: true,
  default: () => <div>TableUsersList</div>
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
