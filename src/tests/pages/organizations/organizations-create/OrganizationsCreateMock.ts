import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';

const organizationsCreateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  organizationsCreateMock.onPost('/organizations').reply(200, {
    success: true,
    message: 'organization created successfully',
    data: {
      id: 1,
      name: 'Test organization',
      address_id: '1',
      logo: 'Some logo url',
      use_double_auth: 0,
      client_admin: {
        login: 'test',
        firstname: 'Test',
        lastname: 'User',
        email: 'test@test.fr'
      }
    }
  });
};

export const setupErrorAxiosMock = () => {
  // Mock the createOrganizations endpoint
  organizationsCreateMock.onPost('/organizations').reply(422, {
    success: false,
    message: {
      value: 'An error occured while creating the organization. Please try again.'
    }
  });
};

export default organizationsCreateMock;
