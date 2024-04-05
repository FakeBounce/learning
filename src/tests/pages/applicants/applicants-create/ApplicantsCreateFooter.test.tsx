import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsCreateFooter from '@src/pages/applicants/applicants-create/ApplicantsCreateFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PATH_APPLICANTS } from '@utils/navigation/paths';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('ApplicantsCreateFooter', () => {
  it('renders ApplicantsCreateFooter correctly', () => {
    render(<ApplicantsCreateFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantCreate: {
            applicantCreateLoading: false
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
      expect(navigateMock).toHaveBeenCalledWith(PATH_APPLICANTS.root);
    });
  });

  it('renders ApplicantsCreateFooter with loadings', () => {
    render(<ApplicantsCreateFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantCreate: {
            applicantCreateLoading: true
          }
        }
      }
    });

    waitFor(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
