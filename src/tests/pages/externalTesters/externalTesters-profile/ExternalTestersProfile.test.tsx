import { cleanup, render, screen, act } from '@testProvider';
import ExternalTestersProfile from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdate';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { generatePath, useNavigate } from 'react-router-dom';
import { singleApplicant } from '@src/tests/pages/applicants/DefaultApplicants';
import { Routes, Route } from 'react-router';
import { waitFor } from '@testing-library/dom';
import ExternalTestersUpdateMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/externalTesters/externalTesters-update/ExternalTestersUpdateMock';

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
    ExternalTestersUpdateMock.reset();
    cleanup();
  });

  it('renders ApplicantProfile correctly', async () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersProfile />} />
        </Routes>,
        {
          customHistory: [
            generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: singleApplicant.id })
          ]
        }
      );
    });

    act(() => {
      waitFor(() => {
        expect(screen.getByText(singleApplicant.email)).toBeInTheDocument();
      });
    });
  });

  it('displays an error when the id is incorrect', async () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersProfile />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: 'invalid' })]
        }
      );
    });

    act(() => {
      waitFor(() => {
        expect(screen.getByText(/Le testeur n'existe pas/i)).toBeInTheDocument();
      });
    });
  });
});
