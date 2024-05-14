import { render, screen, waitFor } from '@testProvider';
import ModulesStudyPlanHeader from '@src/pages/modules/modules-study-plan/ModulesStudyPlanHeader';

describe('ModulesStudyPlanHeader', () => {
  it('should render ModulesStudyPlanHeader correctly', async () => {
    render(<ModulesStudyPlanHeader />);

    await waitFor(() => {
      expect(screen.getByText(/Plan d'étude/i)).toBeInTheDocument();
    });
  });
});
