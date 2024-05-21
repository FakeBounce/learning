import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import {
  defaultMediaDocument,
  defaultModuleForMedias
} from '@src/tests/pages/modules/defaultModule';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import ModulesDocumentDetail from '@src/pages/modules/modules-media/modules-document/ModulesDocumentDetail';

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
        <Route path={PATH_MODULES.documentDetail} element={<ModulesDocumentDetail />} />
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
          generatePath(PATH_MODULES.documentDetail, {
            moduleId: 1,
            documentId: defaultMediaDocument.id
          })
        ]
      }
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Nom du document/i)).toHaveValue(defaultMediaDocument.name);
    });
  });

  it('should navigate back if bad id', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.documentDetail} element={<ModulesDocumentDetail />} />
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
          generatePath(PATH_MODULES.documentDetail, { moduleId: 1, documentId: 'bad-id' })
        ]
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
        <Route path={PATH_MODULES.documentDetail} element={<ModulesDocumentDetail />} />
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
          generatePath(PATH_MODULES.documentDetail, {
            moduleId: 1,
            documentId: defaultMediaDocument.id
          })
        ]
      }
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Nom du document/i)).toHaveValue(defaultMediaDocument.name);
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('submit')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Nom du document/i), {
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
