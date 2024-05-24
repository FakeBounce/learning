import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { MediaType } from '@services/modules/interfaces';
import { defaultMediaImage, defaultModuleComposed } from '@src/tests/pages/modules/defaultModule';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import ModulesDocumentCreate from '@src/pages/modules/modules-media/modules-document/ModulesDocumentCreate';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

// Mocking form-data to pass images in the form
jest.mock('form-data', () => {
  return class FormDataMock {
    private data: { [key: string]: any };

    constructor() {
      this.data = {};
    }

    append(key: string, value: any) {
      // Store the value, mocking files with 'mocked-file'
      this.data[key] = value instanceof File ? 'mocked-file' : value;
    }

    getHeaders() {
      return {};
    }

    getData() {
      // Return the accumulated data directly as an object
      return this.data;
    }
  };
});

describe('ModulesDocumentCreate', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'dummy-preview-url');
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
        <Route path={PATH_MODULES.addDocument} element={<ModulesDocumentCreate />} />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.addDocument, { moduleId: 1 })]
      }
    );

    expect(screen.getByText(/Ajouter un document/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom du document/i)).toBeInTheDocument();
  });

  it('should send form correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.addDocument} element={<ModulesDocumentCreate />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: defaultModuleComposed,
              modulesCurrentIsEditing: false
            }
          }
        },
        customHistory: [generatePath(PATH_MODULES.addDocument, { moduleId: 1 })]
      }
    );

    expect(screen.getByText(/Ajouter un document/i)).toBeInTheDocument();

    const uploadInput = screen.getByTestId('document-upload-box').querySelector('input');
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nom du document/i), {
        target: { value: 'test' }
      });
      fireEvent.drop(uploadInput as Node, { dataTransfer: { files: [file], types: ['Files'] } });
    });

    act(() => {
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(ModulesMock.history.post.length).toBe(1);
      expect(ModulesMock.history.post[0].data.data).toEqual({
        module_id: 1,
        name: 'test',
        file: 'mocked-file',
        media_type: MediaType.DOCUMENT
      });

      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.documentDetail, {
          moduleId: 1,
          documentId: defaultMediaImage.id
        })
      );
    });
  });
});
