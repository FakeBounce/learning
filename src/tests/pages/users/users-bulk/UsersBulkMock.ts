import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { validRowsForUsersBulk } from '@src/tests/pages/users/DefaultUsers';

const ApplicantsBulkMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ApplicantsBulkMock.onPost(/\/users\/add-multiple/).reply(200, {
    success: true,
    message: { value: 'Users created in bulk successfully' },
    data: validRowsForUsersBulk
  });
};

export default ApplicantsBulkMock;
