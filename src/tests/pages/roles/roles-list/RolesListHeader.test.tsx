import { useNavigate } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testProvider';
import RolesListHeader from '@src/pages/roles/roles-list/RolesListHeader';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PATH_ROLES } from '@utils/navigation/paths';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesListHeader', () => {
  const mockPageType = PermissionTypeEnum.ROLES;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockPageType });
  });

  it('renders RolesListHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true), // Mock the isAuthorizedByPermissionsTo function
          canSeePage: jest.fn().mockReturnValue(true) // Mock the canSeePage function
        }}
      >
        <RolesListHeader />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Rôles/i)).toBeInTheDocument();

    // Ensure that the "Ajouter" button is present
    const createButton = screen.getByText(/Ajouter/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    expect(navigateMock).toHaveBeenCalledWith(PATH_ROLES.add);
  });
});
