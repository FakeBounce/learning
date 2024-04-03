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
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
      />
    );

    expect(screen.getByText(/Supprimer un rôle/i)).toBeInTheDocument();
    expect(screen.getByText(defaultRole.name)).toBeInTheDocument();
  });
});
