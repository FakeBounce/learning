import {
  ApplicantType,
  GetApplicantsListRequest,
  GetApplicantsListResponse
} from '@services/applicants/interfaces';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

export const getApplicants = async (
  args: GetApplicantsListRequest
): Promise<AxiosResponse<GetApplicantsListResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/applicants/filter', {
    type: ApplicantType.STUDENT,
    page: currentPage,
    row_per_page: rowsPerPage,
    filters,
    sort
  });
};
