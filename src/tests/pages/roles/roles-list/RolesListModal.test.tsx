import { cleanup, render, screen } from '@src/testProvider';
import RolesListModal from '@src/pages/roles/roles-list/RolesListModal';
import { defaultRole } from '@src/tests/pages/roles/DefaultRole';

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
        isModalOpen={false}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
      />
    );

    expect(screen.getByText(/Supprimer un rôle/i)).toBeInTheDocument();
    expect(screen.getByText(/Êtes-vous sûr de vouloir supprimer le rôle/ + defaultRole.name + /ainsi que tous les groupes et utilisateurs lui étant rattachés \?/i)).toBeInTheDocument();
  });
});