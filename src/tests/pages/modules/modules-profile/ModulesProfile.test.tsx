import { render, screen, waitFor } from '@testProvider';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import { defaultModule } from '@src/tests/pages/modules/defaultModule';
import ModulesProfile from '@src/pages/modules/modules-profile/ModulesProfile';
import { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { PATH_ERRORS, PATH_MODULES } from '@utils/navigation/paths';
import { Routes, Route } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesProfile', () => {
  it('should render ModulesProfile correctly', () => {
    modulesSetupSuccessAxiosMock();
    render(
      <Routes>
        <Route path={PATH_MODULES.profile} element={<ModulesProfile />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: null,
              modulesCurrentLoading: false
            }
          }
        },
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: defaultModule.id })]
      }
    );

    waitFor(() => {
      expect(screen.getByText(defaultModule.title)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Nom du module/i)).toBeDisabled();
  });

  it('should navigate if id is weird', () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    modulesSetupSuccessAxiosMock();
    render(
      <Routes>
        <Route path={PATH_MODULES.profile} element={<ModulesProfile />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: null,
              modulesCurrentLoading: false
            }
          }
        },
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 'weird-id' })]
      }
    );

    waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith("Le module n'existe pas", { variant: 'error' });
      expect(navigateMock).toHaveBeenCalledWith(PATH_ERRORS.root);
    });
  });
});
