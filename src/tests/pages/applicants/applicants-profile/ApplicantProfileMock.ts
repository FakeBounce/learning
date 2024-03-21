import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { singleApplicant } from '../DefaultApplicants';

const ApplicantsProfileMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ApplicantsProfileMock.onGet(/\/applicants\/\d+/).reply(200, {
    success: true,
    message: { value: 'Applicant fetched successfully' },
    data: singleApplicant
  });
};

export default ApplicantsProfileMock;
