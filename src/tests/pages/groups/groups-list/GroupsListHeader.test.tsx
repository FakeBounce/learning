import { useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testProvider';
import GroupsListHeader from '@src/pages/groups/groups-list/GroupsListHeader';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
describe('GroupsListHeader', () => {
  const mockupPageType = PermissionTypeEnum.GROUPS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  it('should render GroupsListHeader correctly', () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
        >
        <GroupsListHeader />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Groupes/i)).toBeInTheDocument();

    //Ensure that the "Ajouter" button is present
    const createButton = screen.getByText(/Ajouter/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    //@TODO: Check if the navigate function has been called when create view is ready
    //expect(navigateMock).toHaveBeenCalledWith(PATH_GROUPS.add);
  });
});