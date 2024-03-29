import { cleanup, render, screen } from "@testProvider";
import GroupsListPopperContent from '@src/pages/groups/groups-list/GroupsListPopperContent';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('GroupsListPopperContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  })
  it('should render GroupsListPopperContent correctly', () => {
    const handleDelete = jest.fn();

    render(
      <GroupsListPopperContent
        groupSelected={defaultGroup}
        handleDelete={handleDelete}
      />
    );

    expect(screen.getByText(/Modifier/i)).toBeInTheDocument();
    expect(screen.getByText(/Supprimer/i)).toBeInTheDocument();
  });
});