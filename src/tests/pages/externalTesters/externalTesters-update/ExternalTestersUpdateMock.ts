import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import {
  conflictedTester,
  defaultTester,
  singleTester
} from '@src/tests/pages/externalTesters/DefaultTesters';

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

export const setupSuccessAxiosMockForConflicts = () => {
  // Mock the createOrganizations endpoint
  ExternalTestersUpdateMock.onPut(`applicants/${conflictedTester.id}`)
    .reply(200, {
      success: true,
      message: { value: 'Applicant updated successfully' },
      data: defaultTester
    })
    .onGet(`applicants/${conflictedTester.id}`)
    .reply(200, {
      success: true,
      message: { value: 'Applicant fetched successfully' },
      data: conflictedTester
    });
};

export default ExternalTestersUpdateMock;
