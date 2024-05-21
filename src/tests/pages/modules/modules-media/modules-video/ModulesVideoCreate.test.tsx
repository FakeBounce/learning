import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { defaultMediaImage, defaultModuleForMedias } from '@src/tests/pages/modules/defaultModule';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import ModulesVideoCreate from '@src/pages/modules/modules-media/modules-video/ModulesVideoCreate';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesVideoCreate', () => {
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
        <Route path={PATH_MODULES.addVideo} element={<ModulesVideoCreate />} />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.addVideo, { moduleId: 1 })]
      }
    );

    expect(screen.getByText(/Ajouter une vidéo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom de la vidéo/i)).toBeInTheDocument();
  });

  it('should send form correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.addVideo} element={<ModulesVideoCreate />} />
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
          generatePath(PATH_MODULES.addVideo, { moduleId: defaultModuleForMedias.id })
        ]
      }
    );

    expect(screen.getByText(/Ajouter une vidéo/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nom de la vidéo/i), {
        target: { value: 'test' }
      });
      fireEvent.change(screen.getByTestId('rhf-textfield-url'), {
        target: { value: 'http://mocked-url.com' }
      });

      fireEvent.click(screen.getByRole('button', { name: /Ok/i }));
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(ModulesMock.history.post.length).toBe(1);
      expect(ModulesMock.history.post[0].url).toBe(`/media`);

      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.videoDetail, {
          moduleId: 1,
          videoId: defaultMediaImage.id // Cause the default return is defaultMediaImage of the mock
        })
      );
    });
  });
});
