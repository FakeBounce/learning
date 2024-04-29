import { render, screen, act, renderHook, waitFor } from '@testProvider';
import GroupsUsersList from '@src/pages/groups/GroupsUsersList';
import { groupsSetupSuccessAxiosMock } from '@src/tests/pages/groups/GroupsMock';
import { defaultUsersList } from '@src/tests/pages/users/DefaultUsers';
import { FormProvider, useForm } from 'react-hook-form';
import { groupsInitialState } from '@redux/reducers/groupsReducer';

describe('GroupsUsersList', () => {
  it('should render correctly', async () => {
    const methods = renderHook(() => useForm()).result.current;
    groupsSetupSuccessAxiosMock();
    await act(async () => {
      render(
        <FormProvider {...methods}>
          <form>
            <GroupsUsersList isEditing={false} />
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
            <GroupsUsersList isEditing={true} />
          </form>
        </FormProvider>,
        {
          preloadedState: {
            groups: {
              ...groupsInitialState,
              currentGroup: {
                currentGroupData: {
                  id: 2,
                  name: 'Test',
                  description: '',
                  isMain: false,
                  nbUsers: 2
                },
                currentGroupLoading: false
              }
            }
          }
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByText('OUI')).toBeInTheDocument();
      expect(screen.getAllByText(/NON/i)).toHaveLength(4);
    });
  });
});
