import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultTester, singleTester } from '@src/tests/pages/externalTesters/DefaultTesters';

const ExternalTestersUpdateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ExternalTestersUpdateMock.onPut(/\/applicants\/\d+/)
    .reply(200, {
      success: true,
      message: { value: 'Applicant fetched successfully' },
      data: defaultTester
    })
    .onGet(/\/applicants\/\d+/)
    .reply(200, {
      success: true,
      message: { value: 'Applicant fetched successfully' },
      data: singleTester
    });
};

export default ExternalTestersUpdateMock;
