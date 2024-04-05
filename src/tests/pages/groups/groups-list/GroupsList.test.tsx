import { setupSuccessAxiosMock } from '@src/tests/pages/groups/groups-list/GroupsListMock';
import { render, waitFor, screen } from '@testProvider';
import GroupsList from '@src/pages/groups/groups-list/GroupsList';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());

describe('GroupsList', () => {
  const mockupPageType = PermissionTypeEnum.GROUPS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  it('should render GroupsList correctly', async () => {
    setupSuccessAxiosMock();
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
        >
        <GroupsList />
      </FeatureFlagContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(defaultGroup.name)).toBeInTheDocument();
    })
  });
});