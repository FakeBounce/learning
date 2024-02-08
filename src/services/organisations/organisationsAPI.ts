import {
  GetOrganisationsRequest,
  GetOrganisationsResponse
} from '@services/organisations/interfaces';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

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
