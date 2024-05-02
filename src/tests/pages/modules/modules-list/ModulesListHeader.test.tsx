import { useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import ModulesListHeader from '@src/pages/modules/modules-list/ModulesListHeader';
import { PATH_MODULES } from '@utils/navigation/paths';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
describe('ModulesListHeader', () => {
  const mockupPageType = PermissionTypeEnum.MODULES;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  it('should render ModulesListHeader correctly', () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ModulesListHeader />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Modules/i)).toBeInTheDocument();

    //Ensure that the "Ajouter" button is present
    const createButton = screen.getByText(/Créer un module/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    expect(navigateMock).toHaveBeenCalledWith(PATH_MODULES.add);
  });
});
