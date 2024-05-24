import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import {
  defaultMediaImage,
  defaultModule,
  defaultModuleComposed,
  defaultModulesList,
  defaultSubject
} from '@src/tests/pages/modules/defaultModule';
import { defaultPagination } from '@src/tests/pages/mocksConstants';

const ModulesMock = new MockAdapter(axios);

export const modulesSetupSuccessAxiosMock = () => {
  /**
   * Mock the create module endpoint
   */
  ModulesMock.onPost('/modules').reply(200, {
    success: true,
    message: { value: 'Module created successfully' },
    data: defaultModule
  });

  /**
   * Mock the get modules list endpoint
   */

  ModulesMock.onPost('/modules/filter').reply(200, {
    success: true,
    message: { value: 'Module fetched successfully' },
    data: {
      pagination: defaultPagination,
      rows: defaultModulesList
    }
  });

  /**
   * Mock the get single module endpoint
   */
  ModulesMock.onGet(/\/modules\/\d+/).reply(200, {
    success: true,
    message: { value: 'Module fetched successfully' },
    data: defaultModule
  });

  /**
   * Mock the delete module subject endpoint
   */
  ModulesMock.onPut(/\/modules\/\d+/).reply(200, {
    success: true,
    message: { value: 'Module deleted successfully' },
    data: defaultModule
  });

  /**
   * Mock the delete module subject endpoint
   */
  ModulesMock.onDelete(/\/modules\/\d+/).reply(200, {
    success: true,
    message: { value: 'Module deleted successfully' },
    data: defaultModuleComposed
  });

  /**
   * Mock the create module subject endpoint
   */
  ModulesMock.onPost(/\/subjects/).reply(200, {
    success: true,
    message: { value: 'Subject created successfully' },
    data: defaultSubject
  });

  /**
   * Mock the delete module subject endpoint
   */
  ModulesMock.onDelete(/\/subjects\/\d+/).reply(200, {
    success: true,
    message: { value: 'Subject deleted successfully' },
    data: defaultModuleComposed
  });

  /**
   * Mock the move module subject endpoint
   */
  ModulesMock.onPut(/\/subjects\/\d+\/move/).reply(200, {
    success: true,
    message: { value: 'Subject moved successfully' },
    data: defaultModuleComposed
  });

  /**
   * Mock the move module subject endpoint
   */
  ModulesMock.onPut(/\/subjects\/\d+/).reply(200, {
    success: true,
    message: { value: 'Subject moved successfully' },
    data: defaultModuleComposed
  });

  /**
   * Mock the create module media endpoint
   */
  ModulesMock.onPost(/\/media/).reply(200, {
    success: true,
    message: { value: 'Media created successfully' },
    data: defaultMediaImage
  });

  /**
   * Mock the delete module media endpoint
   */
  ModulesMock.onDelete(/\/media\/\d+/).reply(200, {
    success: true,
    message: { value: 'Media deleted successfully' },
    data: defaultModuleComposed
  });

  /**
   * Mock the move module media endpoint
   */
  ModulesMock.onPut(/\/media\/\d+\/move/).reply(200, {
    success: true,
    message: { value: 'Media moved successfully' },
    data: defaultModuleComposed
  });

  /**
   * Mock the edit module media endpoint
   */
  ModulesMock.onPut(/\/media\/\d+/).reply(200, {
    success: true,
    message: { value: 'Media moved successfully' },
    data: defaultModuleComposed
  });
};

export const modulesSetupErrorAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ModulesMock.onPost('/modules').reply(422, {
    success: false,
    message: {
      value: 'An error occured while creating the organization. Please try again.'
    }
  });
};

export default ModulesMock;
