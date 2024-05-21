import { render, screen, act, renderHook, waitFor, cleanup } from '@testProvider';
import GroupsMock, { groupsSetupSuccessAxiosMock } from '@src/tests/pages/groups/GroupsMock';
import { FormProvider, useForm } from 'react-hook-form';
import TableGroupsList from '@src/components/table/TableGroupsList';
import { RolesGroupsColumns } from '@src/pages/roles/roles-form/RolesUsersColumns';
import { Group } from '@services/groups/interfaces';
import { defaultGroupsList } from '@src/tests/pages/groups/DefaultGroup';

describe('TableGroupsList', () => {
  afterEach(() => {
    cleanup();
    GroupsMock.reset();
  });

  it('should render correctly', async () => {
    const methods = renderHook(() => useForm()).result.current;
    groupsSetupSuccessAxiosMock();
    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <TableGroupsList
              columns={RolesGroupsColumns({
                isEditing: false,
                currentRole: null
              })}
              onRowSelectionModelChange={jest.fn()}
            />
          </form>
        </FormProvider>
      );
    });

    await waitFor(() => {
      defaultGroupsList.forEach((group: Group) => {
        expect(screen.getByText(group.name)).toBeInTheDocument();
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
            <TableGroupsList
              columns={RolesGroupsColumns({
                isEditing: true,
                currentRole: {
                  id: 2,
                  name: 'Test',
                  description: '',
                  isClientAdmin: false
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
      expect(screen.getAllByText(/NON/i)).toHaveLength(defaultGroupsList.length - 1);
    });
  });
});
