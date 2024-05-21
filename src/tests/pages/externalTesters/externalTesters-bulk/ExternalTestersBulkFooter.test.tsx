import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ExternalTestersBulkFooter from '@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulkFooter';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ExternalTestersBulkFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('renders ExternalTestersBulkFooter correctly', async () => {
    render(<ExternalTestersBulkFooter />);

    // Ensure that the "Annuler" button is present
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    await waitFor(async () => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_EXTERNAL_TESTERS.root);
    });
  });

  it('renders ExternalTestersBulkFooter with loadings', async () => {
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

    await waitFor(async () => {
      expect(screen.getByText(/Enregistrer/i)).toBeDisabled();
    });
  });
});
