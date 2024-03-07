import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';

const LoginAxiosMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  LoginAxiosMock.onPost('/users/login').reply(200, {
    success: true,
    message: 'organization created successfully',
    data: {
      token: 'token',
      refresh_token: 'refresh_token',
      expires_at: 'expires_at'
    }
  });
};

export const setupErrorAxiosMock = () => {
  // Mock the createOrganizations endpoint
  LoginAxiosMock.onPost('/organizations').reply(422, {
    success: false,
    message: {
      value: 'An error occured while creating the organization. Please try again.'
    }
  });
};

export default LoginAxiosMock;
