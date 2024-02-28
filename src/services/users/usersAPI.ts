import { AxiosResponse } from 'axios';
import axios from '@utils/axios';
import {
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
    row_per_page: rowsPerPage,
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
  const { id , ...body} = args;
  return axios.put(
    `/users/${id}`, body
  );
};

export const toggleUserBlock = async (
  args: UpdateUserBlockRequest
): Promise<AxiosResponse<UpdateUserBlockResponse>> => {
  const { setActive, userId } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  return axios.put(`/users/${correctPath}/${userId}`);
};
