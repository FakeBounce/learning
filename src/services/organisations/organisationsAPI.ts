import {
  CreateOrganisationsRequest,
  CreateOrganisationsResponse,
  GetOrganisationsRequest,
  GetOrganisationsResponse,
  GetSingleOrganisationResponse,
  UpdateOrganisationsBlockRequest,
  UpdateOrganisationsBlockResponse,
  UpdateOrganisationsRequest,
  UpdateOrganisationsResponse
} from './interfaces';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

export const createOrganisations = async (
  args: CreateOrganisationsRequest
): Promise<AxiosResponse<CreateOrganisationsResponse>> =>
  axios.post(`/organizations`, args, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const updateOrganisations = async (
  args: UpdateOrganisationsRequest
): Promise<AxiosResponse<UpdateOrganisationsResponse>> => {
  const { id, name, address_id, logo } = args;
  return axios.put(`/organizations/${id}`, {
    name,
    address_id,
    logo
  });
};

export const updateOrganisationsBlock = async (
  args: UpdateOrganisationsBlockRequest
): Promise<AxiosResponse<UpdateOrganisationsBlockResponse>> => {
  const { setActive, organisationId } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  return axios.post(`/organizations/${correctPath}/${organisationId}`);
};

export const getSingleOrganisation = async (
  id: number
): Promise<AxiosResponse<GetSingleOrganisationResponse>> => {
  return axios.get(`/organizations/${id}`);
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
