import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ExternalTestersBulkFooter from '@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulkFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('ExternalTestersBulkFooter', () => {
  it('renders ExternalTestersBulkFooter correctly', () => {
    render(<ExternalTestersBulkFooter />);

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

  it('renders ExternalTestersBulkFooter with loadings', () => {
    render(<ExternalTestersBulkFooter />, {
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

    waitFor(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
