import { AxiosResponse } from 'axios';
import axios from '@utils/axios';
import {
  BulkUserRequest,
  BulkUserResponse,
  GetSingleUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  UpdateUserBlockRequest,
  UpdateUserBlockResponse,
  UpdateUserRequest,
  UpdateUserResponse
} from './interfaces';

export const getUsers = async (args: GetUsersRequest): Promise<AxiosResponse<GetUsersResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/users/filter', {
    page: currentPage,
    rowPerPage: rowsPerPage,
    filters: filters,
    sort: sort
  });
};

export const getSingleUser = async (id: number): Promise<AxiosResponse<GetSingleUserResponse>> => {
  return axios.get(`/users/${id}`);
};

export const updateUser = async (
  args: UpdateUserRequest
): Promise<AxiosResponse<UpdateUserResponse>> => {
  const { id, ...body } = args;
  return axios.put(`/users/${id}`, body);
};

export const toggleUserBlock = async (
  args: UpdateUserBlockRequest
): Promise<AxiosResponse<UpdateUserBlockResponse>> => {
  const { setActive, userId } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  return axios.put(`/users/${userId}/${correctPath}`);
};

export const createBulkUser = async (
  args: BulkUserRequest
): Promise<AxiosResponse<BulkUserResponse>> => {
  return axios.post(`/users/add-multiple`, { users: args });
};
