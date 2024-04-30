import { AxiosResponse } from 'axios';
import axios from '@utils/axios/axios';
import { CreateModuleRequest, CreateModuleResponse } from '@services/modules/interfaces';

export const createModule = async (
  args: CreateModuleRequest
): Promise<AxiosResponse<CreateModuleResponse>> => {
  return axios.post(`/modules`, args, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
