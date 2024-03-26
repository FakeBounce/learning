import {
  ApplicantType,
  GetApplicantsListRequest,
  GetApplicantsListResponse,
  GetSingleApplicantResponse,
  UpdateApplicantBlockRequest,
  UpdateApplicantBlockResponse
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

export const getSingleApplicant = async (
  id: number
): Promise<AxiosResponse<GetSingleApplicantResponse>> => {
  return axios.get(`/applicants/${id}`);
};

export const updateApplicantBlock = async (
  args: UpdateApplicantBlockRequest
): Promise<AxiosResponse<UpdateApplicantBlockResponse>> => {
  const { applicantId, setActive } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  // @todo Not working right now
  return axios.put(`/applicants/${correctPath}/${applicantId}`);
};
