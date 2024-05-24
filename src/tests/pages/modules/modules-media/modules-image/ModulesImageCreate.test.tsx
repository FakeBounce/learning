import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesImageCreate from '@src/pages/modules/modules-media/modules-image/ModulesImageCreate';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { MediaType } from '@services/modules/interfaces';
import { defaultMediaImage, defaultModuleComposed } from '@src/tests/pages/modules/defaultModule';
import { initialModulesState } from '@redux/reducers/modulesReducer';

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

describe('ModulesImageCreate', () => {
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
        <Route path={PATH_MODULES.addImage} element={<ModulesImageCreate />} />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.addImage, { moduleId: 1 })]
      }
    );

    expect(screen.getByText(/Ajouter une image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom de l'image/i)).toBeInTheDocument();
  });

  it('should send form correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.addImage} element={<ModulesImageCreate />} />
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
        customHistory: [generatePath(PATH_MODULES.addImage, { moduleId: 1 })]
      }
    );

    expect(screen.getByText(/Ajouter une image/i)).toBeInTheDocument();

    const uploadInput = screen.getByTestId('illustration-upload-box').querySelector('input');
    const file = new File(['content'], 'test.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nom de l'image/i), {
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
        media_type: MediaType.IMAGE
      });

      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.imageDetail, {
          moduleId: 1,
          imageId: defaultMediaImage.id
        })
      );
    });
  });
});
