import { AxiosResponse } from 'axios';
import axios from '@utils/axios/axios';
import {
  CreateRoleRequest,
  CreateRoleResponse,
  DeleteRoleRequest,
  DeleteRoleResponse,
  GetRolePermissionsRequest,
  GetRolePermissionsResponse,
  GetRolesRequest,
  GetRolesResponse,
  UpdateRoleRequest,
  UpdateRoleResponse
} from '@services/roles/interfaces';

export const getRolePermissions = async (
  args: GetRolePermissionsRequest
): Promise<AxiosResponse<GetRolePermissionsResponse>> => {
  const { roleId } = args;

  return axios.get(`/roles/${roleId}/permissions`);
};

export const getRoles = async (args: GetRolesRequest): Promise<AxiosResponse<GetRolesResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/roles/filter', {
    page: currentPage,
    rowPerPage: rowsPerPage,
    filters,
    sort
  });
};

export const createRole = async (
  args: CreateRoleRequest
): Promise<AxiosResponse<CreateRoleResponse>> => axios.post(`/roles`, args);

export const updateRole = async (
  args: UpdateRoleRequest
): Promise<AxiosResponse<UpdateRoleResponse>> => {
  const { id, ...rest } = args;
  return axios.put(`/roles/${id}`, rest);
};
export const deleteRole = async (
  args: DeleteRoleRequest
): Promise<AxiosResponse<DeleteRoleResponse>> => {
  return axios.delete(`/roles/${args.id}`);
};
