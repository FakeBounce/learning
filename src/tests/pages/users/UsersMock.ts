import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultUsersList, validRowsForUsersBulk } from '@src/tests/pages/users/DefaultUsers';
import { defaultPagination } from '@src/tests/pages/mocksConstants';

const UserMock = new MockAdapter(axios);

export const usersSetupSuccessAxiosMock = () => {
  /**
   * Mock the user bulk creation endpoint
   */
  UserMock.onPost(/\/users\/add-multiple/).reply(200, {
    success: true,
    message: { value: 'Users created in bulk successfully' },
    data: validRowsForUsersBulk
  });

  /**
   * Mock the users list endpoint
   */
  UserMock.onPost(/\/users\/filter/).reply(200, {
    success: true,
    message: { value: '' },
    data: {
      pagination: defaultPagination,
      rows: defaultUsersList
    }
  });

  /**
   * Mock the users block endpoint
   */
  UserMock.onPut(/\/users\/\d+\/block/).reply(200, {
    success: true,
    message: { value: '' },
    data: defaultUsersList[0]
  });
  /**
   * Mock the users unblock endpoint
   */
  UserMock.onPut(/\/users\/\d+\/unblock/).reply(200, {
    success: true,
    message: { value: '' },
    data: defaultUsersList[0]
  });
};

export default UserMock;
