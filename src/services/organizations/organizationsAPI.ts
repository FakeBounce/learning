import {
  CreateorganizationsRequest,
  CreateorganizationsResponse,
  GetOrganizationsRequest,
  GetOrganizationsResponse,
  GetSingleOrganizationResponse,
  updateOrganizationsBlockRequest,
  updateOrganizationsBlockResponse,
  updateOrganizationsRequest,
  updateOrganizationsResponse
} from './interfaces';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

export const createOrganizations = async (
  args: CreateorganizationsRequest
): Promise<AxiosResponse<CreateorganizationsResponse>> =>
  axios.post(`/organizations`, args, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const updateOrganizations = async (
  args: updateOrganizationsRequest
): Promise<AxiosResponse<updateOrganizationsResponse>> => {
  const { id, name, address_id, logo } = args;
  return axios.put(
    `/organizations/${id}`,
    {
      name,
      address_id,
      logo
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
};

export const updateOrganizationsBlock = async (
  args: updateOrganizationsBlockRequest
): Promise<AxiosResponse<updateOrganizationsBlockResponse>> => {
  const { setActive, organizationId } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  return axios.post(`/organizations/${correctPath}/${organizationId}`);
};

export const getSingleOrganization = async (
  id: number
): Promise<AxiosResponse<GetSingleOrganizationResponse>> => {
  return axios.get(`/organizations/${id}`);
};

export const getorganizations = async (
  args: GetOrganizationsRequest
): Promise<AxiosResponse<GetOrganizationsResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/organizations/filter', {
    page: currentPage,
    row_per_page: rowsPerPage,
    filters,
    sort
  });
};
