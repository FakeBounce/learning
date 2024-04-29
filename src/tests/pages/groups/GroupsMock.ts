import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';
import { defaultUsersList } from '@src/tests/pages/users/DefaultUsers';

const GroupsMock = new MockAdapter(axios);

export const groupsSetupSuccessAxiosMock = () => {
  /**
   * Mocks the response for the groups list
   */
  GroupsMock.onPost(/\/groups\/filter/)
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
    })
    .onDelete(/\/groups\/\d+/)
    .reply(200, {
      success: true,
      message: {
        value: 'Le groupe a été supprimé avec succès.',
        level: 'success'
      }
    });

  /**
   * Mocks the response for the group creation
   */
  GroupsMock.onPost(/\/groups/).reply(200, {
    success: true,
    message: {
      value: 'Le groupe a été créé avec succès.',
      level: 'success'
    },
    data: {
      id: 1,
      name: 'Group 1',
      description: 'Description 1',
      isMain: false,
      nbUsers: null
    }
  });

  /**
   * Mocks the response for the group update
   */
  GroupsMock.onPut(/\/groups\/\d+/).reply(200, {
    success: true,
    message: {
      value: 'Le groupe a été modifié avec succès.',
      level: 'success'
    },
    data: {
      id: 1,
      name: 'Group 1',
      description: 'Description 1',
      isMain: false,
      nbUsers: null
    }
  });

  /**
   * Mocks the response for the group details
   */
  GroupsMock.onPost('/users/filter').reply(200, {
    success: true,
    message: { value: '', level: 'success' },
    data: {
      pagination: {
        page: 1,
        row_per_page: 5,
        total_results: 15,
        total_pages: 3
      },
      rows: defaultUsersList
    }
  });
};

export default GroupsMock;
