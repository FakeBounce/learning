import { AxiosResponse } from 'axios';
import axios from '@utils/axios';
import {
  GetUsersRequest,
  GetUsersResponse,
  UpdateUserBlockRequest,
  UpdateUserBlockResponse
} from './interfaces.ts';

export const getUsers = async (args: GetUsersRequest): Promise<AxiosResponse<GetUsersResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/users/filter', {
    page: currentPage,
    row_per_page: rowsPerPage,
    filters: filters,
    sort: sort
  });
};

export const toggleUserBlock = async (
  args: UpdateUserBlockRequest
): Promise<AxiosResponse<UpdateUserBlockResponse>> => {
  const { setActive, userId } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  return axios.put(`/users/${correctPath}/${userId}`);
};
