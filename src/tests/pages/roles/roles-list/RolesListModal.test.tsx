import { cleanup, render, screen, act, fireEvent, waitFor } from '@src/testProvider';
import RolesListModal from '@src/pages/roles/roles-list/RolesListModal';
import { defaultRole } from '@src/tests/pages/roles/DefaultRole';
import RolesMock, {
  rolesSetupErrorAxiosMock,
  rolesSetupSuccessAxiosMock
} from '@src/tests/pages/roles/RolesMock';
import { enqueueSnackbar } from 'notistack';
import { rolesInitialState } from '@redux/reducers/rolesReducer';

describe('RolesListModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders RolesListModal correctly', () => {
    const setIsModalOpen = jest.fn();
    const cancelModal = jest.fn();

    render(
      <RolesListModal
        roleSelected={defaultRole}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
      />
    );

    expect(screen.getByText(/Supprimer un rôle/i)).toBeInTheDocument();
    expect(screen.getByText(defaultRole.name)).toBeInTheDocument();
  });

  it('should call delete and close modal', async () => {
    rolesSetupSuccessAxiosMock();
    const setIsModalOpen = jest.fn();
    const cancelModal = jest.fn();

    render(
      <RolesListModal
        roleSelected={defaultRole}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
      />,
      {
        preloadedState: {
          roles: {
            ...rolesInitialState,
            rolesDelete: {
              rolesDeleteLoading: false
            },
            rolesList: {
              rolesListData: [defaultRole],
              rolesListLoading: false,
              rolesListTotalCount: 1
            }
          }
        }
      }
    );

    expect(screen.getByText(defaultRole.name)).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText(/Valider/i));
    });

    await waitFor(() => {
      expect(RolesMock.history.delete.length).toBe(1);
    });
    await waitFor(() => {
      expect(cancelModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should display an error if server crash', async () => {
    rolesSetupErrorAxiosMock();
    const setIsModalOpen = jest.fn();
    const cancelModal = jest.fn();

    render(
      <RolesListModal
        roleSelected={defaultRole}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
      />
    );

    expect(screen.getByText(defaultRole.name)).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText(/Valider/i));
    });

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
    });
  });
});
