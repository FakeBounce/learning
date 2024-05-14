import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsUpdateFooter from '@src/pages/applicants/applicants-update/ApplicantsUpdateFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { store } from '@redux/store';

describe('ApplicantsUpdateFooter', () => {
  it('renders ApplicantsUpdateFooter correctly', async () => {
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

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      const isEditing = store.getState().applicants.applicantUpdate.isEditing;
      expect(isEditing).toBe(false);
    });
  });

  it('renders ApplicantsUpdateFooter with loadings', async () => {
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

    await waitFor(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
