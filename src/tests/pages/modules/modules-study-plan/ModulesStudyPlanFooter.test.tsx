import { render, screen, waitFor, act } from '@testProvider';
import ModulesStudyPlanFooter from '@src/pages/modules/modules-study-plan/ModulesStudyPlanFooter';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import {
  defaultModuleComposed,
  moduleComposedViewer
} from '@src/tests/pages/modules/defaultModule';

const handleClickMock = jest.fn();
describe('ModulesStudyPlanFooter', () => {
  it('should render ModulesStudyPlanFooter correctly', async () => {
    render(<ModulesStudyPlanFooter handleClick={handleClickMock} />, {
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
      expect(screen.getByText(/Ajouter/i)).toBeInTheDocument();
    });

    act(() => {
      screen.getByText(/Ajouter/i).click();
    });

    expect(handleClickMock).toHaveBeenCalled();
  });

  it('should be disabled if loading', async () => {
    render(<ModulesStudyPlanFooter handleClick={handleClickMock} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModuleComposed
          },
          modulesLoading: true
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Ajouter/i)).toBeInTheDocument();
      expect(screen.getByText(/Ajouter/i)).toBeDisabled();
    });
  });

  it('should be null no rights', async () => {
    render(<ModulesStudyPlanFooter handleClick={handleClickMock} />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: moduleComposedViewer
          },
          modulesLoading: false
        }
      }
    });

    await waitFor(() => {
      expect(screen.queryByText(/Ajouter/i)).not.toBeInTheDocument();
    });
  });
});
