import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultModule, defaultModulesList } from '@src/tests/pages/modules/defaultModule';
import { defaultPagination } from '@src/tests/pages/mocksConstants';

const ModulesMock = new MockAdapter(axios);

export const modulesCreateSetupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ModulesMock.onPost('/modules').reply(200, {
    success: true,
    message: { value: 'Module created successfully' },
    data: defaultModule
  });

  ModulesMock.onPost('/modules/filter').reply(200, {
    success: true,
    message: { value: 'Module fetched successfully' },
    data: {
      pagination: defaultPagination,
      rows: defaultModulesList
    }
  });
};

export const modulesCreateSetupErrorAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ModulesMock.onPost('/modules').reply(422, {
    success: false,
    message: {
      value: 'An error occured while creating the organization. Please try again.'
    }
  });
};

export default ModulesMock;
