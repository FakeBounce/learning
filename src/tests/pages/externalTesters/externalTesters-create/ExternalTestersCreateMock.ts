import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { newTester } from '../DefaultTesters';
import { defaultGroupsList } from '@src/tests/pages/groups/DefaultGroup';

const ExternalTestersCreateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ExternalTestersCreateMock.onPost(/\/applicants/)
    .reply(200, {
      success: true,
      message: { value: 'Tester created successfully' },
      data: newTester
    })
    .onPost(/\/groups\/filter/)
    .reply(200, {
      success: true,
      message: { value: 'Tester created successfully' },
      data: {
        pagination: {
          page: 1,
          row_per_page: 10,
          total_results: 1,
          total_pages: 1
        },
        rows: defaultGroupsList
      }
    });
};

export default ExternalTestersCreateMock;
