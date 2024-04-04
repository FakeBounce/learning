import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { ApplicantBulkFromApi } from '../DefaultApplicants';

const ApplicantsBulkMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ApplicantsBulkMock.onPost(/\/applicants\/add-multiple/).reply(200, {
    success: true,
    message: { value: 'Applicants created in bulk successfully' },
    data: { rows: ApplicantBulkFromApi }
  });
};

export default ApplicantsBulkMock;
