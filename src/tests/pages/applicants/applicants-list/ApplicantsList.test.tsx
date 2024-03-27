import { render, screen, waitFor, act, fireEvent, cleanup } from '@testProvider';
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

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());

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
    render(<ApplicantsList />);

    await waitFor(() => {
      expect(screen.getByText(defaultApplicant.city as string)).toBeInTheDocument();
      expect(screen.getByText(newApplicant.city as string)).toBeInTheDocument();
      expect(screen.getByText(blockedApplicant.city as string)).toBeInTheDocument();
      expect(screen.getByText(unlockedApplicant.city as string)).toBeInTheDocument();
    });
  });

  it('should call filter with sort when clicking on headers', async () => {
    setupSuccessAxiosMock();
    render(<ApplicantsList />);

    await waitFor(() => {
      expect(screen.getByText(defaultApplicant.city as string)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Prénom/i));
    });

    await waitFor(() => {
      expect(ApplicantsListMock.history.post).toHaveLength(2);
      expect(ApplicantsListMock.history.post[1].data).toEqual(
        '{"type":"student","page":0,"row_per_page":10,"sort":{"field":"firstname","direction":"ASC"}}'
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Prénom/i));
    });

    await waitFor(() => {
      expect(ApplicantsListMock.history.post).toHaveLength(3);
      expect(ApplicantsListMock.history.post[2].data).toEqual(
        '{"type":"student","page":0,"row_per_page":10,"sort":{"field":"firstname","direction":"DESC"}}'
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Prénom/i));
    });

    await waitFor(() => {
      expect(ApplicantsListMock.history.post).toHaveLength(4);
      expect(ApplicantsListMock.history.post[3].data).toEqual(
        '{"type":"student","page":0,"row_per_page":10}'
      );
    });
  });
});
