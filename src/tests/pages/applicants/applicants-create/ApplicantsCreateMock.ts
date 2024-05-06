import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { newApplicant } from '../DefaultApplicants';
import { defaultGroupsList } from '@src/tests/pages/groups/DefaultGroup';

const ApplicantsCreateMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ApplicantsCreateMock.onPost(/\/applicants/)
    .reply(200, {
      success: true,
      message: { value: 'Applicant created successfully' },
      data: newApplicant
    })
    .onPost(/\/groups\/filter/)
    .reply(200, {
      success: true,
      message: { value: 'Applicant created successfully' },
      data: {
        pagination: {
          page: 1,
          row_per_page: 10,
          total_results: 1,
          total_pages: 1
        },
        rows: defaultGroupsList
      }
    });
};

export default ApplicantsCreateMock;
