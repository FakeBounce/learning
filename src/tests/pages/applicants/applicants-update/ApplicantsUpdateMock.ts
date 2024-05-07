import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { conflictedApplicant, defaultApplicant, singleApplicant } from '../DefaultApplicants';

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

export const setupSuccessAxiosMockForConflicts = () => {
  // Mock the createOrganizations endpoint
  ApplicantsUpdateMock.onPut(`applicants/${conflictedApplicant.id}`)
    .reply(200, {
      success: true,
      message: { value: 'Applicant updated successfully' },
      data: defaultApplicant
    })
    .onGet(`applicants/${conflictedApplicant.id}`)
    .reply(200, {
      success: true,
      message: { value: 'Applicant fetched successfully' },
      data: conflictedApplicant
    });
};

export default ApplicantsUpdateMock;
