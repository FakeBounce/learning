import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';

const RolesListMock = new MockAdapter(axios);
export const setupSuccessAxiosMock = () => {
  RolesListMock.onPost(/\/roles\/filter/)
    .reply(200, {
      success: true,
      message: { value: '', level: 'success' },
      data: {
        rows: [
          {
            id: 5,
            name: "test",
            description: "Role de test"
          }
        ],
        pagination: {
          page: 1,
          row_per_page: 10,
          total_results: 1,
          total_pages: 1
        }
      }
    });
};

export default RolesListMock;