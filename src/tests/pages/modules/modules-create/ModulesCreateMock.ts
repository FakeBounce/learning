import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultModule } from '@src/tests/pages/modules/defaultModule';

const modulesCreateMock = new MockAdapter(axios);

export const modulesCreateSetupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  modulesCreateMock.onPost('/modules').reply(200, {
    success: true,
    message: { value: 'Module created successfully' },
    data: defaultModule
  });
};

export const modulesCreateSetupErrorAxiosMock = () => {
  // Mock the createOrganizations endpoint
  modulesCreateMock.onPost('/modules').reply(422, {
    success: false,
    message: {
      value: 'An error occured while creating the organization. Please try again.'
    }
  });
};

export default modulesCreateMock;
