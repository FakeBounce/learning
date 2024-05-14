import { cleanup, render, screen, waitFor } from '@testProvider';
import ApplicantsProfile from '@src/pages/applicants/applicants-update/ApplicantsUpdate';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { generatePath, useNavigate } from 'react-router-dom';
import { singleApplicant } from '@src/tests/pages/applicants/DefaultApplicants';
import { Routes, Route } from 'react-router';
import ApplicantProfileMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/applicants/applicants-profile/ApplicantsProfileMock';
import { enqueueSnackbar } from 'notistack';

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

    await waitFor(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsProfile />} />
        </Routes>,
        {
          customHistory: [
            generatePath(PATH_APPLICANTS.profile, { applicantId: singleApplicant.id })
          ]
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByText(singleApplicant.email)).toBeInTheDocument();
    });
  });

  it('displays an error when the id is incorrect', async () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await waitFor(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsProfile />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_APPLICANTS.profile, { applicantId: 'invalid' })]
        }
      );
    });

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith("L'étudiant n'existe pas", { variant: 'error' });
    });
  });
});
