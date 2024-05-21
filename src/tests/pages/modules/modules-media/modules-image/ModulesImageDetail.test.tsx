import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import ModulesImageDetail from '@src/pages/modules/modules-media/modules-image/ModulesImageDetail';
import { defaultMediaImage, defaultModuleForMedias } from '@src/tests/pages/modules/defaultModule';
import { initialModulesState } from '@redux/reducers/modulesReducer';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesImageDetail', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    ModulesMock.reset();
  });

  it('should render correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.imageDetail} element={<ModulesImageDetail />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: defaultModuleForMedias
            }
          }
        },
        customHistory: [
          generatePath(PATH_MODULES.imageDetail, { moduleId: 1, imageId: defaultMediaImage.id })
        ]
      }
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Nom de l'image/i)).toHaveValue(defaultMediaImage.name);
    });
  });

  it('should navigate back if bad id', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.imageDetail} element={<ModulesImageDetail />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: defaultModuleForMedias
            }
          }
        },
        customHistory: [generatePath(PATH_MODULES.imageDetail, { moduleId: 1, imageId: 'bad-id' })]
      }
    );

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.profile, { moduleId: 1 })
      );
    });
  });

  it('should send edit form correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.imageDetail} element={<ModulesImageDetail />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: defaultModuleForMedias
            }
          }
        },
        customHistory: [
          generatePath(PATH_MODULES.imageDetail, { moduleId: 1, imageId: defaultMediaImage.id })
        ]
      }
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Nom de l'image/i)).toHaveValue(defaultMediaImage.name);
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('submit')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Nom de l'image/i), { target: { value: 'new name' } });
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(ModulesMock.history.put.length).toBe(1);
      expect(ModulesMock.history.put[0].data).toEqual(
        JSON.stringify({
          name: 'new name'
        })
      );
    });
  });
});
