import { AxiosResponse } from 'axios';
import axios from '@utils/axios';
import { GetGroupsRequest, GetGroupsResponse } from '@services/groups/interfaces';

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
}