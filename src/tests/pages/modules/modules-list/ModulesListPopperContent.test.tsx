import { cleanup, render, screen, act } from '@testProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import ModulesListPopperContent from '@src/pages/modules/modules-list/ModulesListPopperContent';
import {
  defaultModuleComposed,
  moduleComposedViewer
} from '@src/tests/pages/modules/defaultModule';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesListPopperContent', () => {
  const mockupPageType = PermissionTypeEnum.MODULES;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render ModulesListPopperContent correctly', () => {
    const handleDelete = jest.fn();
    const handleDuplicate = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ModulesListPopperContent
          moduleSelected={defaultModuleComposed}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
        />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Voir/i)).toBeInTheDocument();
    expect(screen.getByText(/Duppliquer/i)).toBeInTheDocument();
    expect(screen.getByText(/Supprimer/i)).toBeInTheDocument();
  });

  it('should navigate to module path on Voir click', () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const handleDelete = jest.fn();
    const handleDuplicate = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ModulesListPopperContent
          moduleSelected={defaultModuleComposed}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
        />
      </FeatureFlagContext.Provider>
    );

    const goToModuleButton = screen.getByText(/Voir/i);
    expect(goToModuleButton).toBeInTheDocument();

    act(() => {
      goToModuleButton.click();
    });

    expect(navigateMock).toHaveBeenCalledWith(
      generatePath(PATH_MODULES.profile, { moduleId: defaultModuleComposed.id })
    );
  });

  it('should not see delete if no rights', () => {
    const handleDelete = jest.fn();
    const handleDuplicate = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ModulesListPopperContent
          moduleSelected={moduleComposedViewer}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
        />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Voir/i)).toBeInTheDocument();
    expect(screen.getByText(/Duppliquer/i)).toBeInTheDocument();
    expect(screen.queryByText(/Supprimer/i)).not.toBeInTheDocument();
  });
});
