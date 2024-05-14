import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsProfileHeader from '@src/pages/applicants/applicants-profile/ApplicantsProfileHeader';
import { useNavigate } from 'react-router-dom';
import { stateApplicant } from '@src/tests/pages/applicants/DefaultApplicants';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

const navigateMock = jest.fn().mockResolvedValueOnce({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

describe('ApplicantProfileHeader', () => {
  const mockPageType = PermissionTypeEnum.ROLES;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockPageType });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ApplicantProfileHeader correctly', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ApplicantsProfileHeader isUpdate={false} />
      </FeatureFlagContext.Provider>,
      {
        preloadedState: {
          applicants: {
            ...initialApplicantState,
            applicantProfile: {
              applicantProfileData: stateApplicant,
              applicantProfileLoading: false
            }
          }
        }
      }
    );

    expect(screen.getByText(stateApplicant.firstname)).toBeInTheDocument();

    const updateButton = screen.getByText(/Modifier/i);
    expect(updateButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(updateButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
    });
  });

  it('renders no actions if not updating', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ApplicantsProfileHeader isUpdate={true} />
      </FeatureFlagContext.Provider>,
      {
        preloadedState: {
          applicants: {
            ...initialApplicantState,
            applicantProfile: {
              applicantProfileData: stateApplicant,
              applicantProfileLoading: false
            }
          }
        }
      }
    );

    expect(screen.getByText(stateApplicant.firstname)).toBeInTheDocument();

    expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
  });

  it('renders no actions if no rights', async () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(false),
          canSeePage: jest.fn().mockReturnValue(false)
        }}
      >
        <ApplicantsProfileHeader isUpdate={false} />
      </FeatureFlagContext.Provider>,
      {
        preloadedState: {
          applicants: {
            ...initialApplicantState,
            applicantProfile: {
              applicantProfileData: stateApplicant,
              applicantProfileLoading: false
            }
          }
        }
      }
    );

    expect(screen.getByText(stateApplicant.firstname)).toBeInTheDocument();

    expect(screen.queryByText(/Modifier/i)).not.toBeInTheDocument();
  });
});
