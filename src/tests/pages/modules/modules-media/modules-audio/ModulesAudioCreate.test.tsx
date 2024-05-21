import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { defaultMediaImage, defaultModuleForMedias } from '@src/tests/pages/modules/defaultModule';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import ModulesAudioCreate from '@src/pages/modules/modules-media/modules-audio/ModulesAudioCreate';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesAudioCreate', () => {
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
        <Route path={PATH_MODULES.addAudio} element={<ModulesAudioCreate />} />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.addAudio, { moduleId: 1 })]
      }
    );

    expect(screen.getByText(/Ajouter un audio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom de l'audio/i)).toBeInTheDocument();
  });

  it('should send form correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.addAudio} element={<ModulesAudioCreate />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: defaultModuleForMedias,
              modulesCurrentLoading: false,
              modulesCurrentIsEditing: false
            }
          }
        },
        customHistory: [
          generatePath(PATH_MODULES.addAudio, { moduleId: defaultModuleForMedias.id })
        ]
      }
    );

    expect(screen.getByText(/Ajouter un audio/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nom de l'audio/i), {
        target: { value: 'test' }
      });
      fireEvent.change(screen.getByLabelText(/URL de l'audio/i), {
        target: { value: 'http://mocked-url.com' }
      });

      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(ModulesMock.history.post.length).toBe(1);
      expect(ModulesMock.history.post[0].url).toBe(`/media`);

      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.audioDetail, {
          moduleId: 1,
          audioId: defaultMediaImage.id // Cause the default return is defaultMediaImage of the mock
        })
      );
    });
  });
});
