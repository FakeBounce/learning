import {
  CreateOrganizationsRequest,
  CreateOrganizationsResponse,
  GetOrganizationsRequest,
  GetOrganizationsResponse,
  GetSingleOrganizationResponse,
  SetOrganizationsLogoRequest,
  SetOrganizationsLogoResponse,
  UpdateOrganizationsBlockRequest,
  UpdateOrganizationsBlockResponse,
  UpdateOrganizationsRequest,
  UpdateOrganizationsResponse
} from './interfaces';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

export const createOrganizations = async (
  args: CreateOrganizationsRequest
): Promise<AxiosResponse<CreateOrganizationsResponse>> =>
  axios.post(`/organizations`, args, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const updateOrganizations = async (
  args: UpdateOrganizationsRequest
): Promise<AxiosResponse<UpdateOrganizationsResponse>> => {
  const { id, name, addressId } = args;

  return axios.put(`/organizations/${id}`, {
    name,
    addressId
  });
};

export const setOrganizationsLogo = async (
  args: SetOrganizationsLogoRequest
): Promise<AxiosResponse<SetOrganizationsLogoResponse>> => {
  const { id, logo } = args;
  
  return axios.post(
    `/organizations/${id}/logo`,
    { image: logo },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
};

export const updateOrganizationsBlock = async (
  args: UpdateOrganizationsBlockRequest
): Promise<AxiosResponse<UpdateOrganizationsBlockResponse>> => {
  const { setActive, organizationId } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  return axios.put(`/organizations/${organizationId}/${correctPath}`);
};

export const getSingleOrganization = async (
  id: number
): Promise<AxiosResponse<GetSingleOrganizationResponse>> => {
  return axios.get(`/organizations/${id}`);
};

export const getOrganizations = async (
  args: GetOrganizationsRequest
): Promise<AxiosResponse<GetOrganizationsResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/organizations/filter', {
    page: currentPage,
    rowPerPage: rowsPerPage,
    filters,
    sort
  });
};
