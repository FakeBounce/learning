import { render, screen, waitFor } from '@testProvider';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import { defaultModule } from '@src/tests/pages/modules/defaultModule';
import ModulesStudyPlanTitle from '@src/pages/modules/modules-study-plan/ModulesStudyPlanTitle';

describe('ModulesStudyPlanTitle', () => {
  it('should render ModulesStudyPlanTitle correctly', async () => {
    render(<ModulesStudyPlanTitle />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModule
          }
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByTitle(defaultModule.title)).toBeInTheDocument();
    });
  });

  it('should render a skeleton if loading', async () => {
    render(<ModulesStudyPlanTitle />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: null
          },
          modulesLoading: true
        }
      }
    });

    await waitFor(() => {
      expect(screen.queryByTitle(defaultModule.title)).not.toBeInTheDocument();
    });
  });
});
