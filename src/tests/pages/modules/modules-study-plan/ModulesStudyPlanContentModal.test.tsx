import { render, screen, waitFor, act, fireEvent } from '@testProvider';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import {
  defaultModuleComposed,
  defaultModuleComposition
} from '@src/tests/pages/modules/defaultModule';
import ModulesStudyPlanContentModal from '@src/pages/modules/modules-study-plan/ModulesStudyPlanContentModal';
import { moduleContentTypes, moduleQuestionTypes } from '@utils/helpers/moduleContent';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesStudyPlanContentModal', () => {
  const navigateMock = jest.fn().mockResolvedValueOnce({});

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('should render ModulesStudyPlanContentModal correctly', async () => {
    render(<ModulesStudyPlanContentModal isOpen={true} onClose={jest.fn()} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleComposed
          },
          modulesLoading: false
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Ajouter du contenu/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Type de contenu/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Dans le sujet/i)).toBeInTheDocument();
      expect(screen.getByText(defaultModuleComposition[0].name)).toBeInTheDocument();

      expect(screen.queryByLabelText(/Type de question/i)).not.toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Type de contenu/i), {
        target: { value: moduleContentTypes[1].value } // Question
      });
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Type de question/i)).toBeInTheDocument();
    });
  });

  it('should navigate to question if selected', async () => {
    render(<ModulesStudyPlanContentModal isOpen={true} onClose={jest.fn()} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleComposed
          },
          modulesLoading: false
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Ajouter du contenu/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Type de contenu/i), {
        target: { value: moduleContentTypes[1].value } // Question
      });
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Type de question/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Type de question/i), {
        target: { value: moduleQuestionTypes[0].value }
      });

      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.addQuestion, { moduleId: defaultModuleComposed.id })
      );
    });
  });

  it('should navigate to document if selected', async () => {
    render(<ModulesStudyPlanContentModal isOpen={true} onClose={jest.fn()} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleComposed
          },
          modulesLoading: false
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Ajouter du contenu/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Type de contenu/i), {
        target: { value: moduleContentTypes[0].value } // Document
      });
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.addDocument, { moduleId: defaultModuleComposed.id })
      );
    });
  });

  it('should navigate to image if selected', async () => {
    render(<ModulesStudyPlanContentModal isOpen={true} onClose={jest.fn()} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleComposed
          },
          modulesLoading: false
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Ajouter du contenu/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Type de contenu/i), {
        target: { value: moduleContentTypes[2].value } // Image
      });
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.addImage, { moduleId: defaultModuleComposed.id })
      );
    });
  });

  it('should navigate to video if selected', async () => {
    render(<ModulesStudyPlanContentModal isOpen={true} onClose={jest.fn()} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleComposed
          },
          modulesLoading: false
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Ajouter du contenu/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Type de contenu/i), {
        target: { value: moduleContentTypes[3].value } // Video
      });
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.addVideo, { moduleId: defaultModuleComposed.id })
      );
    });
  });

  it('should navigate to audio if selected', async () => {
    render(<ModulesStudyPlanContentModal isOpen={true} onClose={jest.fn()} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleComposed
          },
          modulesLoading: false
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Ajouter du contenu/i)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Type de contenu/i), {
        target: { value: moduleContentTypes[4].value } // Audio
      });
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.addAudio, { moduleId: defaultModuleComposed.id })
      );
    });
  });
});
