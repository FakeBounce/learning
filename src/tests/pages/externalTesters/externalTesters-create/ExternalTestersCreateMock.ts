import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { newTester } from '../DefaultTesters';

const ExternalTestersCreateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ExternalTestersCreateMock.onPost(/\/applicants/).reply(200, {
    success: true,
    message: { value: 'Tester created successfully' },
    data: newTester
  });
};

export default ExternalTestersCreateMock;
