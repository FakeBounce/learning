import { render, screen, fireEvent, act, waitFor, cleanup } from '@testProvider';
import ExternalTestersCreateFooter from '@src/pages/externalTesters/externalTesters-create/ExternalTestersCreateFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ExternalTestersCreateFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders ExternalTestersCreateFooter correctly', async () => {
    render(<ExternalTestersCreateFooter />, {
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

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_EXTERNAL_TESTERS.root);
    });
  });

  it('renders ApplicantsCreateFooter with loadings', async () => {
    render(<ExternalTestersCreateFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantCreate: {
            applicantCreateLoading: true
          }
        }
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
