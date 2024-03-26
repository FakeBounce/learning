import { render, screen, fireEvent, act } from '@testProvider';
import ApplicantProfileHeader from '@src/pages/applicants/applicants-profile/ApplicantProfileHeader';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { stateApplicant } from '@src/tests/pages/applicants/DefaultApplicants';

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

    render(<ApplicantProfileHeader />, {
      preloadedState: {
        applicants: {
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

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(
      PATH_APPLICANTS.update.replace(':applicantId', String(stateApplicant.id))
    );
  });
});
