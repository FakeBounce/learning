import { AxiosResponse } from 'axios';
import axios from '@utils/axios';
import {
  DeleteGroupRequest,
  DeleteGroupResponse,
  CreateGroupRequest,
  CreateGroupResponse,
  GetGroupsRequest,
  GetGroupsResponse,
  UpdateGroupRequest,
  UpdateGroupResponse
} from '@services/groups/interfaces';

export const getGroups = async (
  args: GetGroupsRequest
): Promise<AxiosResponse<GetGroupsResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/groups/filter', {
    page: currentPage,
    row_per_page: rowsPerPage,
    filters,
    sort
  });
};

export const deleteGroup = async (
  args: DeleteGroupRequest
): Promise<AxiosResponse<DeleteGroupResponse>> => {
  const { groupId } = args;

  return axios.delete(`/groups/${groupId}`);
};

export const createGroup = async (
  args: CreateGroupRequest
): Promise<AxiosResponse<CreateGroupResponse>> => {
  return axios.post(`/groups`, args);
};

export const updateGroup = async (
  args: UpdateGroupRequest
): Promise<AxiosResponse<UpdateGroupResponse>> => {
  const { id } = args;
  return axios.put(`/groups/${id}`, args);
};
