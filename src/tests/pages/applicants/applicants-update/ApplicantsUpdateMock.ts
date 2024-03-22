import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { defaultApplicant, singleApplicant } from '../DefaultApplicants';

const ApplicantsUpdateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ApplicantsUpdateMock.onPut(/\/applicants\/\d+/)
    .reply(200, {
      success: true,
      message: { value: 'Applicant fetched successfully' },
      data: defaultApplicant
    })
    .onGet(/\/applicants\/\d+/)
    .reply(200, {
      success: true,
      message: { value: 'Applicant fetched successfully' },
      data: singleApplicant
    });
};

export default ApplicantsUpdateMock;
