import { render, screen, waitFor, cleanup } from '@testProvider';
import ApplicantsList from '@src/pages/applicants/applicants-list/ApplicantsList';
import {
  defaultApplicant,
  newApplicant,
  blockedApplicant,
  unlockedApplicant
} from '../DefaultApplicants';
import ApplicantsListMock, { setupSuccessAxiosMock } from './ApplicantsListMock';
import { useOutletContext } from 'react-router';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

describe('ApplicantsList', () => {
  beforeEach(() => {
    const mockPageType = PermissionTypeEnum.APPLICANTS;
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockPageType });
  });

  afterEach(() => {
    cleanup();
    ApplicantsListMock.reset();
  });

  it('renders ApplicantsList correctly', async () => {
    setupSuccessAxiosMock();
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ApplicantsList />
      </FeatureFlagContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(defaultApplicant.city as string)).toBeInTheDocument();
      expect(screen.getByText(newApplicant.city as string)).toBeInTheDocument();
      expect(screen.getByText(blockedApplicant.city as string)).toBeInTheDocument();
      expect(screen.getByText(unlockedApplicant.city as string)).toBeInTheDocument();
    });
  });
});
