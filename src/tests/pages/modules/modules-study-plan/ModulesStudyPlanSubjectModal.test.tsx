import { render, screen, waitFor, cleanup, fireEvent, act } from '@testProvider';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import { defaultModuleComposed } from '@src/tests/pages/modules/defaultModule';
import modulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import ModulesStudyPlanSubjectModal from '@src/pages/modules/modules-study-plan/ModulesStudyPlanSubjectModal';

const onCloseMock = jest.fn();
describe('ModulesStudyPlanSubjectModal', () => {
  beforeEach(() => {
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    modulesMock.reset();
    jest.clearAllMocks();
  });

  it('should render ModulesStudyPlanSubjectModal correctly', async () => {
    render(<ModulesStudyPlanSubjectModal isOpen={true} onClose={onCloseMock} />);

    await waitFor(() => {
      expect(screen.getByText(/Ajouter un sujet/i)).toBeInTheDocument();
    });
  });

  it('should send form correctly', async () => {
    render(<ModulesStudyPlanSubjectModal isOpen={true} onClose={onCloseMock} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            ...initialModulesState.modulesCurrent,
            modulesCurrentData: defaultModuleComposed
          }
        }
      }
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Titre du sujet/i), {
        target: { value: 'New title' }
      });
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(modulesMock.history.post).toHaveLength(1);
      expect(modulesMock.history.post[0].data).toBe(
        JSON.stringify({
          module_id: defaultModuleComposed.id,
          title: 'New title'
        })
      );
    });
  });
});
