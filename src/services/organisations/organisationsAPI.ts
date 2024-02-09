import {
  CreateOrganisationsRequest,
  GetOrganisationsRequest,
  GetOrganisationsResponse,
  UpdateOrganisationsBlockRequest,
  UpdateOrganisationsBlockResponse
} from './interfaces';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

export const createOrganisations = async (
  args: CreateOrganisationsRequest
): Promise<AxiosResponse<any>> => {
  return axios.post(`/organizations`, args, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateOrganisationsBlock = async (
  args: UpdateOrganisationsBlockRequest
): Promise<AxiosResponse<UpdateOrganisationsBlockResponse>> => {
  const { setActive, organisationId } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  return axios.post(`/organizations/${correctPath}/${organisationId}`);
};

export const getOrganisations = async (
  args: GetOrganisationsRequest
): Promise<AxiosResponse<GetOrganisationsResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/organizations/filter', {
    page: currentPage,
    row_per_page: rowsPerPage,
    filters,
    sort
  });
};
