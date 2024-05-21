import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsBulkFooter from '@src/pages/applicants/applicants-bulk/ApplicantsBulkFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ApplicantsBulkFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('renders ApplicantsBulkFooter correctly', async () => {
    render(<ApplicantsBulkFooter />);

    // Ensure that the "Annuler" button is present
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    await waitFor(async () => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_APPLICANTS.root);
    });
  });

  it('renders ApplicantsBulkFooter with loadings', async () => {
    render(<ApplicantsBulkFooter />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantBulk: {
            hasCreatedBulk: false,
            applicantBulkLoading: true
          }
        }
      }
    });

    await waitFor(async () => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
