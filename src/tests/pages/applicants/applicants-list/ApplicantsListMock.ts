import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import {
  defaultApplicant,
  blockedApplicant,
  unlockedApplicant,
  newApplicant
} from '../DefaultApplicants';

const ApplicantsListMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  ApplicantsListMock.onPost(/\/applicants\/\d+\/block/)
    .reply(200, {
      success: true,
      message: { value: 'Applicants blocked successfully' },
      data: defaultApplicant
    })
    .onPost(/\/applicants\/\d+\/unblock/)
    .reply(200, {
      success: true,
      message: { value: 'Applicants unblocked successfully' },
      data: defaultApplicant
    })
    .onPost(/\/applicants\/filter/)
    .reply(200, {
      success: true,
      message: { value: 'Applicants list fetched successfully' },
      data: {
        rows: [defaultApplicant, blockedApplicant, unlockedApplicant, newApplicant],
        pagination: {
          total: 4,
          page: 1,
          row_per_page: 10
        }
      }
    });
};

export default ApplicantsListMock;
