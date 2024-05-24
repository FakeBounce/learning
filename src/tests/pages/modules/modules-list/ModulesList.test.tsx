import { render, waitFor, screen, cleanup, act, fireEvent } from '@testProvider';
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
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    ModulesMock.reset();
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

  it('should call delete on validate modal', async () => {
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
      expect(ModulesMock.history.delete).toHaveLength(1);
      expect(ModulesMock.history.delete[0].url).toBe(`/modules/${defaultModulesList[0].id}`);
    });
  });
});
