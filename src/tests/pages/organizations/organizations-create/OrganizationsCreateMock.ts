import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultOrganization } from '@src/tests/pages/organizations/DefaultOrganization';

const organizationsCreateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  organizationsCreateMock.onPost('/organizations').reply(200, {
    success: true,
    message: { value: 'Organisation created successfully' },
    data: defaultOrganization
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
