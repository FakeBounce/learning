import { render, screen, act, fireEvent, cleanup, waitFor } from '@testProvider';
import groupsMock, { groupsSetupSuccessAxiosMock } from '@src/tests/pages/groups/GroupsMock';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';
import GroupsUpdate from '@src/pages/groups/groups-update/GroupsUpdate';
import { groupsInitialState } from '@redux/reducers/groupsReducer';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';
import { Route, Routes } from 'react-router';
// import { enqueueSnackbar } from 'notistack';

const configGroupsUpdate = {
  preloadedState: {
    groups: {
      ...groupsInitialState,
      currentGroup: {
        currentGroupData: defaultGroup,
        currentGroupLoading: false
      }
    }
  },
  customHistory: [generatePath(PATH_GROUPS.update, { groupId: defaultGroup.id })]
};

const navigateMock = jest.fn().mockResolvedValueOnce({});
// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('GroupsUpdate', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    groupsSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    groupsMock.reset();
  });

  it('should render correctly', () => {
    act(() => {
      render(
        <Routes>
          <Route path={PATH_GROUPS.update} element={<GroupsUpdate />} />
        </Routes>,
        configGroupsUpdate
      );
    });

    const title = screen.getByText(/Modifier un groupe/i);
    expect(title).toBeInTheDocument();
  });

  it('should navigate if no currentGroup data', () => {
    act(() => {
      render(
        <Routes>
          <Route path={PATH_GROUPS.update} element={<GroupsUpdate />} />
        </Routes>,
        configGroupsUpdate
      );
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_GROUPS.root);
    });
  });

  it('should send form data correctly', async () => {
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_GROUPS.update} element={<GroupsUpdate />} />
        </Routes>,
        configGroupsUpdate
      );
    });

    const nameInput = screen.getByLabelText(/Nom du groupe/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByRole('submit');

    await waitFor(() => {
      expect(nameInput).toHaveValue(defaultGroup.name);
      expect(descriptionInput).toHaveValue(defaultGroup.description);
    });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(groupsMock.history.put.length).toBe(1);

      expect(groupsMock.history.put[0].data).toBe(
        JSON.stringify({
          id: defaultGroup.id,
          name: 'Test Group',
          description: 'Test Description'
        })
      );
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_GROUPS.root);
    });
  });

  // @Todo Uncomment when found a fix for warnings
  // it("should send a warning if nothing's been touched", async () => {
  //   await act(async () => {
  //     render(
  //       <Routes>
  //         <Route path={PATH_GROUPS.update} element={<GroupsUpdate />} />
  //       </Routes>,
  //       {
  //         preloadedState: {
  //           groups: {
  //             ...groupsInitialState,
  //             currentGroup: {
  //               currentGroupData: defaultGroup,
  //               currentGroupLoading: false
  //             }
  //           }
  //         },
  //         customHistory: [generatePath(PATH_GROUPS.update, { groupId: defaultGroup.id })]
  //       }
  //     );
  //   });
  //
  //   const nameInput = screen.getByLabelText(/Nom du groupe/i);
  //   const descriptionInput = screen.getByLabelText(/Description/i);
  //   const submitButton = screen.getByRole('submit');
  //
  //   await waitFor(() => {
  //     expect(nameInput).toHaveValue(defaultGroup.name);
  //     expect(descriptionInput).toHaveValue(defaultGroup.description);
  //   });
  //
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  // await act(async () => {
  //   expect(enqueueSnackbar).toHaveBeenCalledWith("Aucune modification n'a été effectuée", {
  //     variant: 'warning'
  //   });
  // });
  // });
});
