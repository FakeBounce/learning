import { render, screen, waitFor, act, fireEvent, cleanup } from '@testProvider';
import ApplicantsList from '@src/pages/applicants/applicants-list/ApplicantsList';
import {
  defaultApplicant,
  newApplicant,
  blockedApplicant,
  unlockedApplicant
} from '../DefaultApplicants';
import ApplicantsListMock, { setupSuccessAxiosMock } from './ApplicantsListMock';

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());

describe('ApplicantsList', () => {
  afterEach(() => {
    cleanup();
    ApplicantsListMock.reset();
  });

  it('renders ApplicantsList correctly', async () => {
    setupSuccessAxiosMock();
    render(<ApplicantsList />);

    await waitFor(() => {
      expect(screen.getByText(defaultApplicant.city)).toBeInTheDocument();
      expect(screen.getByText(newApplicant.city)).toBeInTheDocument();
      expect(screen.getByText(blockedApplicant.city)).toBeInTheDocument();
      expect(screen.getByText(unlockedApplicant.city)).toBeInTheDocument();
    });
  });

  it('should call filter with sort when clicking on headers', async () => {
    setupSuccessAxiosMock();
    render(<ApplicantsList />);

    await waitFor(() => {
      expect(screen.getByText(defaultApplicant.city)).toBeInTheDocument();
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
