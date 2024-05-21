import { render, waitFor, screen, cleanup } from '@testProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import ModulesList from '@src/pages/modules/modules-list/ModulesList';
import { defaultModulesList } from '@src/tests/pages/modules/defaultModule';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

describe('ModulesList', () => {
  const mockupPageType = PermissionTypeEnum.MODULES;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
    ModulesMock.reset();
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render ModulesList correctly', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ModulesList />
      </FeatureFlagContext.Provider>
    );

    await waitFor(() => {
      defaultModulesList.forEach((module) => {
        expect(screen.getByText(module.title)).toBeInTheDocument();
      });
    });
  });
});
