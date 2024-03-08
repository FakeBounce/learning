import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';

const OrganizationsUpdateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the updateOrganizations and getSingleOrganization endpoints
  OrganizationsUpdateMock.onPut(/\/organizations\/\d+/)
    .reply(200, {
      success: true,
      message: 'Organization updated successfully',
      data: {
        id: 1,
        name: 'Test Organization',
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
    })
    .onGet(/\/organizations\/\d+/)
    .reply(200, {
      success: true,
      data: {
        id: 1,
        name: 'Test Organization',
        address_id: '1',
        address: 'Some address',
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
  // Mock the updateOrganizations and getSingleOrganization endpoints
  OrganizationsUpdateMock.onPut(/\/organizations\/\d+/).reply(422, {
    success: false,
    message: {
      value: 'An error occurred while updating the organization. Please try again.'
    }
  });
};

export default OrganizationsUpdateMock;