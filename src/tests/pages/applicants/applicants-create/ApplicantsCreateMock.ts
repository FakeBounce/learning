import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { newApplicant } from '../DefaultApplicants';

const ApplicantsCreateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ApplicantsCreateMock.onPost(/\/applicants/).reply(200, {
    success: true,
    message: { value: 'Applicant created successfully' },
    data: newApplicant
  });
};

export default ApplicantsCreateMock;
