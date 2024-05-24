import { render, screen, waitFor } from '@testProvider';
import ModulesProfileHeader from '@src/pages/modules/modules-profile/ModulesProfileHeader';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import { defaultModule } from '@src/tests/pages/modules/defaultModule';

describe('ModulesProfileHeader', () => {
  it('should render ModulesProfileHeader correctly', () => {
    render(<ModulesProfileHeader />, {
      preloadedState: {
        modules: {
          ...initialModulesState,
          modulesCurrent: {
            modulesCurrentData: defaultModule
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.getByText(defaultModule.title)).toBeInTheDocument();
    });
  });
});
