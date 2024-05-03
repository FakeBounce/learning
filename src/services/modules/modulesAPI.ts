import { AxiosResponse } from 'axios';
import axios from '@utils/axios/axios';
import {
  GetModulesRequest,
  GetModulesResponse,
  CreateModuleRequest,
  CreateModuleResponse,
  GetSingleModuleRequest,
  GetSingleModuleResponse
} from '@services/modules/interfaces';

export const getModules = async (
  args: GetModulesRequest
): Promise<AxiosResponse<GetModulesResponse>> => {
  const { currentPage, rowsPerPage, sort, filters } = args;

  return axios.post('/modules/filter', {
    page: currentPage,
    row_per_page: rowsPerPage,
    filters,
    sort
  });
};

export const getSingleModule = async (
  args: GetSingleModuleRequest
): Promise<AxiosResponse<GetSingleModuleResponse>> => {
  return axios.get(`/modules/${args.id}`);
};

export const createModule = async (
  args: CreateModuleRequest
): Promise<AxiosResponse<CreateModuleResponse>> => {
  return axios.post(`/modules`, args, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
