import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import {
  blockedTester,
  defaultTester,
  newTester,
  unlockedTester
} from '@src/tests/pages/externalTesters/DefaultTesters';

const ExternalTestersListMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ExternalTestersListMock.onPost(/\/applicants\/\d+\/block/)
    .reply(200, {
      success: true,
      message: { value: 'Tester blocked successfully' },
      data: defaultTester
    })
    .onPost(/\/applicants\/\d+\/unblock/)
    .reply(200, {
      success: true,
      message: { value: 'Tester unblocked successfully' },
      data: defaultTester
    })
    .onPost(/\/applicants\/filter/)
    .reply(200, {
      success: true,
      message: { value: 'Testers list fetched successfully' },
      data: {
        rows: [defaultTester, blockedTester, unlockedTester, newTester],
        pagination: {
          total: 4,
          page: 1,
          row_per_page: 10
        }
      }
    });
};

export default ExternalTestersListMock;
