import { render, screen, waitFor, act, fireEvent, cleanup } from '@testProvider';
import ExternalTestersList from '@src/pages/externalTesters/externalTesters-list/ExternalTestersList';
import { defaultTester, newTester, blockedTester, unlockedTester } from '../DefaultTesters';
import ExternalTestersListMock, { setupSuccessAxiosMock } from './ExternalTestersListMock';
import { ApplicantType } from '@services/applicants/interfaces';

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());
jest.mock('@src/pages/externalTesters/externalTesters-list/ExternalTestersListHeader', () =>
  jest.fn()
);

describe('ExternalTestersList', () => {
  afterEach(() => {
    cleanup();
    ExternalTestersListMock.reset();
  });

  it('renders ExternalTestersList correctly', async () => {
    setupSuccessAxiosMock();
    render(<ExternalTestersList />);

    await waitFor(() => {
      expect(screen.getByText(defaultTester.email as string)).toBeInTheDocument();
      expect(screen.getByText(newTester.email as string)).toBeInTheDocument();
      expect(screen.getByText(blockedTester.email as string)).toBeInTheDocument();
      expect(screen.getByText(unlockedTester.email as string)).toBeInTheDocument();
    });
  });

  it('should call filter with sort when clicking on headers', async () => {
    setupSuccessAxiosMock();
    render(<ExternalTestersList />);

    await waitFor(() => {
      expect(screen.getByText(defaultTester.email as string)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Prénom/i));
    });

    await waitFor(() => {
      expect(ExternalTestersListMock.history.post).toHaveLength(2);
      expect(ExternalTestersListMock.history.post[1].data).toEqual(
        JSON.stringify({
          type: ApplicantType.TESTER,
          page: 0,
          row_per_page: 10,
          sort: { field: 'firstname', direction: 'ASC' }
        })
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Prénom/i));
    });

    await waitFor(() => {
      expect(ExternalTestersListMock.history.post).toHaveLength(3);
      expect(ExternalTestersListMock.history.post[2].data).toEqual(
        JSON.stringify({
          type: ApplicantType.TESTER,
          page: 0,
          row_per_page: 10,
          sort: { field: 'firstname', direction: 'DESC' }
        })
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Prénom/i));
    });

    await waitFor(() => {
      expect(ExternalTestersListMock.history.post).toHaveLength(4);
      expect(ExternalTestersListMock.history.post[3].data).toEqual(
        JSON.stringify({
          type: ApplicantType.TESTER,
          page: 0,
          row_per_page: 10
        })
      );
    });
  });
});
