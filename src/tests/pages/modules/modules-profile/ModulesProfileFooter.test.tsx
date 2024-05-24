import { render, screen, waitFor, act, fireEvent, cleanup } from '@testProvider';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import {
  defaultModule,
  defaultModuleSupervisor,
  defaultModuleViewer
} from '@src/tests/pages/modules/defaultModule';
import ModulesProfileFooter from '@src/pages/modules/modules-profile/ModulesProfileFooter';

describe('ModulesProfileHeader', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render ModulesProfileHeader correctly', () => {
    render(<ModulesProfileFooter />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModule,
            modulesCurrentIsEditing: false
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.getByText(/Modifier/i)).toBeInTheDocument();
    });
  });

  it('should render nothing is data is null', () => {
    render(<ModulesProfileFooter />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: null,
            modulesCurrentIsEditing: false
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Annuler/i)).not.toBeInTheDocument();
    });
  });

  it('should not see update if only viewer', () => {
    render(<ModulesProfileFooter />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleViewer,
            modulesCurrentIsEditing: false
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Annuler/i)).not.toBeInTheDocument();
    });
  });

  it('should not see update if only supervisor', () => {
    render(<ModulesProfileFooter />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleSupervisor,
            modulesCurrentIsEditing: false
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Annuler/i)).not.toBeInTheDocument();
    });
  });

  it('should see update and cancel buttons if is editing', () => {
    render(<ModulesProfileFooter />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModule,
            modulesCurrentIsEditing: true
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Annuler/i)).toBeInTheDocument();
      expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
    });
  });

  it('should toggle edition on button click', async () => {
    render(<ModulesProfileFooter />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModule,
            modulesCurrentIsEditing: false
          }
        }
      }
    });

    let editButton: Node | Window;
    await waitFor(() => {
      editButton = screen.getByText(/Modifier/i);
    });

    await act(async () => {
      fireEvent.click(editButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Annuler/i)).toBeInTheDocument();
      expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Annuler/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/Modifier/i)).toBeInTheDocument();
    });
  });
});
