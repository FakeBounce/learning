import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsUpdateFooter from '@src/pages/applicants/applicants-update/ApplicantsUpdateFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { useAppSelector } from '@redux/hooks';

describe('ApplicantsUpdateFooter', () => {
  it('renders ApplicantsUpdateFooter correctly', () => {
    render(<ApplicantsUpdateFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantUpdate: {
            isEditing: true,
            applicantUpdateLoading: false
          }
        }
      }
    });

    // Ensure that the "Annuler" button is present
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    waitFor(() => {
      const { isEditing } = useAppSelector((state) => state.applicants.applicantUpdate);
      expect(isEditing).toBe(false);
    });
  });

  it('renders ApplicantsUpdateFooter with loadings', () => {
    render(<ApplicantsUpdateFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantUpdate: {
            isEditing: false,
            applicantUpdateLoading: true
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
