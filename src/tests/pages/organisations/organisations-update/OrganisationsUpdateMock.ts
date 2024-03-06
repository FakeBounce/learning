import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';

const OrganisationsUpdateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the updateOrganisations and getSingleOrganisation endpoints
  OrganisationsUpdateMock.onPut(/\/organizations\/\d+/)
    .reply(200, {
      success: true,
      message: 'Organisation updated successfully',
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
    })
    .onGet(/\/organizations\/\d+/)
    .reply(200, {
      success: true,
      data: {
        id: 1,
        name: 'Test Organisation',
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
  // Mock the updateOrganisations and getSingleOrganisation endpoints
  OrganisationsUpdateMock.onPut(/\/organizations\/\d+/).reply(422, {
    success: false,
    message: {
      value: 'An error occurred while updating the organisation. Please try again.'
    }
  });
};

export default OrganisationsUpdateMock;
