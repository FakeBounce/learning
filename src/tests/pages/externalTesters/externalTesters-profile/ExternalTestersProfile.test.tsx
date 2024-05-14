import { cleanup, render, screen, act, waitFor } from '@testProvider';
import ExternalTestersProfile from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdate';
import { PATH_ERRORS, PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { generatePath, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import ExternalTestersUpdateMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/externalTesters/externalTesters-update/ExternalTestersUpdateMock';
import { enqueueSnackbar } from 'notistack';
import { singleTester } from '@src/tests/pages/externalTesters/DefaultTesters';

const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('@src/pages/applicants/applicants-profile/ApplicantsProfileHeader', () => jest.fn());

describe('ExternalTestersProfile', () => {
  beforeEach(() => {
    setupSuccessAxiosMock();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    ExternalTestersUpdateMock.reset();
    cleanup();
    jest.clearAllMocks();
  });

  it('renders ExternalTestersProfile correctly', async () => {
    await waitFor(async () => {
      render(
        <Routes>
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersProfile />} />
        </Routes>,
        {
          customHistory: [
            generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: singleTester.id })
          ]
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByText(singleTester.email)).toBeInTheDocument();
    });
  });

  it('displays an error when the id is incorrect', async () => {
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

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ERRORS.root);
      expect(enqueueSnackbar).toHaveBeenCalledWith("Le testeur n'existe pas", { variant: 'error' });
    });
  });
});
