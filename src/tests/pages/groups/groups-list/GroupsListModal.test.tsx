import { cleanup, render, screen } from '@testProvider';
import GroupsListModal from '@src/pages/groups/groups-list/GroupsListModal';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';

describe('GroupsListModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render GroupsListModal correctly', () => {
    const setIsModalOpen = jest.fn();
    const cancelModal = jest.fn();

    render(
      <GroupsListModal
        groupSelected={defaultGroup}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
      />
    );

    expect(screen.getByText(/Supprimer un groupe/i)).toBeInTheDocument();
    expect(screen.getByText(defaultGroup.name)).toBeInTheDocument();
  });
});