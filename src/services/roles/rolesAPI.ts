import { AxiosResponse } from 'axios';
import axios from '@utils/axios/axios';
import { GetRolePermissionsRequest, GetRolePermissionsResponse } from '@services/roles/interfaces';

export const getRolePermissions = async (
  args: GetRolePermissionsRequest
): Promise<AxiosResponse<GetRolePermissionsResponse>> => {
  const { roleId } = args;

  return axios.get(`/roles/${roleId}/permissions`);
};
