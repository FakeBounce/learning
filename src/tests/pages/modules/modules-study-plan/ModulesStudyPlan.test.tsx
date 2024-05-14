import { render, screen, waitFor } from '@testProvider';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';

describe('ModulesStudyPlan', () => {
  it('should render ModulesStudyPlan correctly', async () => {
    render(<ModulesStudyPlan />);

    await waitFor(() => {
      expect(screen.getByText(/Plan d'étude/i)).toBeInTheDocument();
    });
  });
});
