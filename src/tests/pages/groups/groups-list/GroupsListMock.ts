import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';

const GroupsListMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  GroupsListMock.onPost(/\/groups\/filter/)
    .reply(200, {
      success: true,
      message: { value: '', level: 'success' },
      data: {
        rows: [defaultGroup],
        pagination: {
          page: 1,
          row_per_page: 10,
          total_results: 1,
          total_pages: 1
        }
      }
    });
}