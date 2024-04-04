import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultOrganization } from '@src/tests/pages/organizations/DefaultOrganization';

const OrganizationsUpdateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the updateOrganizations and getSingleOrganization endpoints
  OrganizationsUpdateMock.onPut(/\/organizations\/\d+/)
    .reply(200, {
      success: true,
      message: { value: 'Organization updated successfully' },
      data: {
        id: 1,
        name: 'Test Organization',
        addressId: '1',
        logo: 'Some logo url',
        useDoubleAuth: 0,
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
      data: defaultOrganization
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
