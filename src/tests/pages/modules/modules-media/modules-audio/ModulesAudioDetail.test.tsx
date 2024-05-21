import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { defaultMediaAudio, defaultModuleForMedias } from '@src/tests/pages/modules/defaultModule';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import ModulesAudioDetail from '@src/pages/modules/modules-media/modules-audio/ModulesAudioDetail';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesVideoDetail', () => {
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
        <Route path={PATH_MODULES.audioDetail} element={<ModulesAudioDetail />} />
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
          generatePath(PATH_MODULES.audioDetail, { moduleId: 1, audioId: defaultMediaAudio.id })
        ]
      }
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Nom de l'audio/i)).toHaveValue(defaultMediaAudio.name);
    });
  });

  it('should navigate if bad id', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.audioDetail} element={<ModulesAudioDetail />} />
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
          generatePath(PATH_MODULES.audioDetail, {
            moduleId: defaultModuleForMedias.id,
            audioId: 'djazij'
          })
        ]
      }
    );

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.profile, { moduleId: defaultModuleForMedias.id })
      );
    });
  });

  it('should send edit form correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.audioDetail} element={<ModulesAudioDetail />} />
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
          generatePath(PATH_MODULES.audioDetail, { moduleId: 1, audioId: defaultMediaAudio.id })
        ]
      }
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Nom de l'audio/i)).toHaveValue(defaultMediaAudio.name);
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('submit')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Nom de l'audio/i), {
        target: { value: 'new name' }
      });
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
