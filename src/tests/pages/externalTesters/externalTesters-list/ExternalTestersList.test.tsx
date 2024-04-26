import { render, screen, waitFor, cleanup } from '@testProvider';
import ExternalTestersList from '@src/pages/externalTesters/externalTesters-list/ExternalTestersList';
import { defaultTester, newTester, blockedTester, unlockedTester } from '../DefaultTesters';
import ExternalTestersListMock, { setupSuccessAxiosMock } from './ExternalTestersListMock';

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
});
