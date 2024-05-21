import { cleanup, render, screen, act, fireEvent } from '@testProvider';
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
    const handleDeleteGroup = jest.fn();

    render(
      <GroupsListModal
        groupSelected={defaultGroup}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
        handleDeleteGroup={handleDeleteGroup}
      />
    );

    expect(screen.getByText(/Supprimer un groupe/i)).toBeInTheDocument();
    expect(screen.getByText(defaultGroup.name)).toBeInTheDocument();
  });

  it('should suppress group', () => {
    const setIsModalOpen = jest.fn();
    const cancelModal = jest.fn();
    const handleDeleteGroup = jest.fn();

    render(
      <GroupsListModal
        groupSelected={defaultGroup}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        cancelModal={cancelModal}
        handleDeleteGroup={handleDeleteGroup}
      />
    );

    const deleteBtn = screen.getByText(/Valider/i);

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(handleDeleteGroup).toHaveBeenCalledTimes(1);
  });
});
