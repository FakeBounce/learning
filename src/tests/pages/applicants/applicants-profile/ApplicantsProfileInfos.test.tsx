import { render, screen } from '@testProvider';
import ApplicantsProfileInfos from '@src/pages/applicants/applicants-profile/ApplicantsProfileInfos';
import { useNavigate } from 'react-router-dom';
import {
  stateApplicant,
  stateApplicantDisabled
} from '@src/tests/pages/applicants/DefaultApplicants';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ApplicantProfileInfos', () => {
  it('renders ApplicantProfileInfos correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ApplicantsProfileInfos />, {
      preloadedState: {
        applicants: {
          applicantProfile: {
            applicantProfileData: stateApplicant
          }
        }
      }
    });

    expect(screen.getByText(stateApplicant.firstname)).toBeInTheDocument();
    expect(screen.getByText(stateApplicant.lastname)).toBeInTheDocument();
    expect(screen.getByText(stateApplicant.city as string)).toBeInTheDocument();
    expect(screen.getByText(stateApplicant.email)).toBeInTheDocument();
    expect(screen.getAllByText(/Oui/i)).toHaveLength(3);
  });

  it('renders a disabled profile correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ApplicantsProfileInfos />, {
      preloadedState: {
        applicants: {
          applicantProfile: {
            applicantProfileData: stateApplicantDisabled
          }
        }
      }
    });

    expect(screen.getAllByText(/Non/i)).toHaveLength(3);
  });
});
