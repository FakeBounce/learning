import { cleanup, render, screen } from "@testProvider";
import GroupsListPopperContent from '@src/pages/groups/groups-list/GroupsListPopperContent';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

describe('GroupsListPopperContent', () => {
  const mockupPageType = PermissionTypeEnum.GROUPS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render GroupsListPopperContent correctly', () => {
    const handleDelete = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
        >
        <GroupsListPopperContent
          groupSelected={defaultGroup}
          handleDelete={handleDelete}
        />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Modifier/i)).toBeInTheDocument();
    expect(screen.getByText(/Supprimer/i)).toBeInTheDocument();
  });
});