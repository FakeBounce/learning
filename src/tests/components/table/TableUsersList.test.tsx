import { render, screen, act, renderHook, waitFor } from '@testProvider';
import TableUsersList from '@src/components/table/TableUsersList';
import { groupsSetupSuccessAxiosMock } from '@src/tests/pages/groups/GroupsMock';
import { defaultUsersList } from '@src/tests/pages/users/DefaultUsers';
import { FormProvider, useForm } from 'react-hook-form';
import { GroupsUsersColumns } from '@src/pages/groups/groups-form/GroupsUsersColumns';

describe('TableUsersList', () => {
  it('should render correctly', async () => {
    const methods = renderHook(() => useForm()).result.current;
    groupsSetupSuccessAxiosMock();
    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <TableUsersList
              columns={GroupsUsersColumns({
                isEditing: false,
                currentGroup: null
              })}
              onRowSelectionModelChange={jest.fn()}
            />
          </form>
        </FormProvider>
      );
    });

    await waitFor(() => {
      defaultUsersList.forEach((user) => {
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    });
  });

  it('should render correctly when editing', async () => {
    const methods = renderHook(() => useForm()).result.current;
    groupsSetupSuccessAxiosMock();
    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <TableUsersList
              columns={GroupsUsersColumns({
                isEditing: true,
                currentGroup: {
                  id: 2,
                  name: 'Test',
                  description: '',
                  isMain: false,
                  nbUsers: 2
                }
              })}
              onRowSelectionModelChange={jest.fn()}
            />
          </form>
        </FormProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('OUI')).toBeInTheDocument();
      expect(screen.getAllByText(/NON/i)).toHaveLength(4);
    });
  });
});
