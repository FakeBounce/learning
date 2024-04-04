import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ExternalTestersCreateFooter from '@src/pages/externalTesters/externalTesters-create/ExternalTestersCreateFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('ExternalTestersCreateFooter', () => {
  it('renders ExternalTestersCreateFooter correctly', () => {
    render(<ExternalTestersCreateFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantCreate: {
            hasCreated: false,
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
      expect(navigateMock).toHaveBeenCalledWith(PATH_EXTERNAL_TESTERS.root);
    });
  });

  it('renders ApplicantsCreateFooter with loadings', () => {
    render(<ExternalTestersCreateFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantCreate: {
            hasCreated: false,
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