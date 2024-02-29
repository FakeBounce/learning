import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';

const OrganisationsCreateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganisations endpoint
  OrganisationsCreateMock.onPost('/organizations').reply(200, {
    success: true,
    message: 'Organisation created successfully',
    data: {
      id: 1,
      name: 'Test Organisation',
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
  // Mock the createOrganisations endpoint
  OrganisationsCreateMock.onPost('/organizations').reply(422, {
    success: false,
    message: {
      value: 'An error occured while creating the organisation. Please try again.'
    }
  });
};

export default OrganisationsCreateMock;
