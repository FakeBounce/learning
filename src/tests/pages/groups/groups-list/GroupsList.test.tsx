import GroupsMock, { groupsSetupSuccessAxiosMock } from '@src/tests/pages/groups/GroupsMock';
import { render, waitFor, screen, cleanup, act, fireEvent } from '@testProvider';
import GroupsList from '@src/pages/groups/groups-list/GroupsList';
import { defaultGroupsList } from '@src/tests/pages/groups/DefaultGroup';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

describe('GroupsList', () => {
  const mockupPageType = PermissionTypeEnum.GROUPS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  afterEach(() => {
    cleanup();
    GroupsMock.reset();
  });

  it('should render GroupsList correctly', async () => {
    groupsSetupSuccessAxiosMock();
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
      expect(screen.getByText(defaultGroupsList[0].name)).toBeInTheDocument();
    });
  });

  it('should delete Group correctly', async () => {
    groupsSetupSuccessAxiosMock();

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
      expect(screen.getByText(defaultGroupsList[0].name)).toBeInTheDocument();
    });

    let actionsButton: any;
    await waitFor(() => {
      actionsButton = screen.getAllByTestId(/chipActions/i)[0];
      expect(actionsButton).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(actionsButton);
    });

    let deleteButton: any;
    await waitFor(() => {
      deleteButton = screen.getByText(/Supprimer/i);
      expect(deleteButton).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    let validateButton: any;
    await waitFor(() => {
      validateButton = screen.getByText(/Valider/i);
      expect(validateButton).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(validateButton);
    });

    await waitFor(() => {
      expect(GroupsMock.history.delete).toHaveLength(1);
      expect(GroupsMock.history.delete[0].url).toBe(`/groups/${defaultGroupsList[0].id}`);
    });
  });
});
