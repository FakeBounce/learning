import { cleanup, render, screen, act } from '@testProvider';
import ApplicantsProfile from '@src/pages/applicants/applicants-update/ApplicantsUpdate';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { singleApplicant } from '@src/tests/pages/applicants/DefaultApplicants';
import { Routes, Route } from 'react-router';
import { waitFor } from '@testing-library/dom';
import ApplicantProfileMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/applicants/applicants-profile/ApplicantsProfileMock';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('@src/pages/applicants/applicants-profile/ApplicantsProfileHeader', () => jest.fn());

describe('ApplicantProfile', () => {
  beforeEach(() => {
    setupSuccessAxiosMock();
  });
  afterEach(() => {
    // Clear the Axios mock
    ApplicantProfileMock.reset();
    cleanup();
  });

  it('renders ApplicantProfile correctly', async () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await act(() => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsProfile />} />
        </Routes>,
        {
          customHistory: [
            PATH_APPLICANTS.profile.replace(':applicantId', String(singleApplicant.id))
          ]
        }
      );
    });

    await act(() => {
      waitFor(() => {
        expect(screen.getByText(singleApplicant.email)).toBeInTheDocument();
      });
    });
  });

  it('displays an error when the id is incorrect', async () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await act(() => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsProfile />} />
        </Routes>,
        {
          customHistory: [PATH_APPLICANTS.profile.replace(':applicantId', 'invalid')]
        }
      );
    });

    await act(() => {
      waitFor(() => {
        expect(screen.getByText(/L'étudiant n'existe pas/i)).toBeInTheDocument();
      });
    });
  });
});
