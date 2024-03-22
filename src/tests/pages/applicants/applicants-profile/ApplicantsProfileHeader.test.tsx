import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsProfileHeader from '@src/pages/applicants/applicants-profile/ApplicantsProfileHeader';
import { useNavigate } from 'react-router-dom';
import { stateApplicant } from '@src/tests/pages/applicants/DefaultApplicants';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ApplicantProfileHeader', () => {
  it('renders ApplicantProfileHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ApplicantsProfileHeader />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantProfile: {
            applicantProfileData: stateApplicant
          }
        }
      }
    });

    expect(screen.getByText(stateApplicant.firstname)).toBeInTheDocument();

    // Ensure that the "Annuler" button is present
    const updateButton = screen.getByText(/Modifier/i);
    expect(updateButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(updateButton);
    });

    waitFor(() => {
      expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
    });
  });
});
