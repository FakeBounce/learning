import { setupSuccessAxiosMock } from '@src/tests/pages/groups/groups-list/GroupsListMock';
import { render, waitFor, screen } from '@testProvider';
import GroupsList from '@src/pages/groups/groups-list/GroupsList';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());

describe('GroupsList', () => {
  it('should render GroupsList correctly', async () => {
    setupSuccessAxiosMock();
    render(<GroupsList />);

    await waitFor(() => {
      expect(screen.getByText(defaultGroup.name)).toBeInTheDocument();
    })
  });
});