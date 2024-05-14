import { render, screen, waitFor, fireEvent, act } from '@testProvider';
import ModulesStudyPlanPopover from '@src/pages/modules/modules-study-plan/ModulesStudyPlanPopover';

const onCloseMock = jest.fn();
const toggleContentModalMock = jest.fn();
const toggleSubjectModalMock = jest.fn();

describe('ModulesStudyPlanPopover', () => {
  it('should render ModulesStudyPlanPopover correctly', async () => {
    await waitFor(() => {
      render(
        <ModulesStudyPlanPopover
          handleClose={onCloseMock}
          toggleContentModal={toggleContentModalMock}
          toggleSubjectModal={toggleSubjectModalMock}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Un sujet/i)).toBeInTheDocument();
      expect(screen.getByText(/Un contenu/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Un sujet/i));
    });
    expect(toggleSubjectModalMock).toHaveBeenCalled();

    await act(async () => {
      fireEvent.click(screen.getByText(/Un contenu/i));
    });

    expect(toggleContentModalMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
});
