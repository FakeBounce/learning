import { render, screen, waitFor, act, cleanup } from '@testProvider';
import ModulesStudyPlanContent from '@src/pages/modules/modules-study-plan/ModulesStudyPlanContent';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import {
  defaultModuleComposed,
  defaultModuleComposition
} from '@src/tests/pages/modules/defaultModule';
import modulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { DragDirection, drop, move, pickUp } from '@src/tests/mocks/DnDMock';

describe('ModulesStudyPlanContent', () => {
  beforeEach(() => {
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    modulesMock.reset();
    jest.clearAllMocks();
  });

  it('should render ModulesStudyPlan correctly', async () => {
    render(<ModulesStudyPlanContent />, {
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
      expect(screen.getByText(defaultModuleComposition[0].name)).toBeInTheDocument();
    });
  });

  it('should drag and drop correctly', async () => {
    render(<ModulesStudyPlanContent />, {
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
      expect(screen.getByText(defaultModuleComposition[0].name)).toBeInTheDocument();
    });

    act(() => {
      pickUp(screen.getByText(defaultModuleComposition[0].name));
      move(screen.getByText(defaultModuleComposition[0].name), DragDirection.DOWN);
      drop(screen.getByText(defaultModuleComposition[0].name));
    });

    await waitFor(() => {
      expect(modulesMock.history.put).toHaveLength(1);
      expect(modulesMock.history.put[0].data).toBe(
        JSON.stringify({ subject_id: defaultModuleComposition[0].id, new_position: 1 })
      );
    });
  });
});
