import { AxiosResponse } from 'axios';
import axios from '@utils/axios/axios';
import {
  GetModulesRequest,
  GetModulesResponse,
  CreateModuleRequest,
  CreateModuleResponse,
  GetSingleModuleRequest,
  GetSingleModuleResponse,
  CreateModuleSubjectRequest,
  CreateModuleSubjectResponse,
  DeleteModuleSubjectRequest,
  DeleteModuleSubjectResponse,
  MoveModuleSubjectRequest,
  MoveModuleSubjectResponse,
  CreateModuleMediaRequest,
  CreateModuleMediaResponse,
  DeleteModuleMediaRequest,
  DeleteModuleMediaResponse,
  MoveModuleMediaRequest,
  MoveModuleMediaResponse,
  UpdateModuleMediaRequest,
  UpdateModuleMediaResponse
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

export const createSubject = async (
  args: CreateModuleSubjectRequest
): Promise<AxiosResponse<CreateModuleSubjectResponse>> => {
  return axios.post(`/subjects`, args);
};

export const deleteSubject = async (
  args: DeleteModuleSubjectRequest
): Promise<AxiosResponse<DeleteModuleSubjectResponse>> => {
  return axios.delete(`/subjects/${args.subjectId}`);
};

export const moveSubject = async (
  args: MoveModuleSubjectRequest
): Promise<AxiosResponse<MoveModuleSubjectResponse>> => {
  return axios.put(`/subjects/${args.subjectId}/move`, args);
};

export const createMedia = async (
  args: CreateModuleMediaRequest
): Promise<AxiosResponse<CreateModuleMediaResponse>> => {
  return axios.post(`/media`, args, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteMedia = async (
  args: DeleteModuleMediaRequest
): Promise<AxiosResponse<DeleteModuleMediaResponse>> => {
  return axios.delete(`/media/${args.mediaId}`);
};

export const moveMedia = async (
  args: MoveModuleMediaRequest
): Promise<AxiosResponse<MoveModuleMediaResponse>> => {
  return axios.put(`/media/${args.mediaId}/move`, args);
};

export const updateMedia = async (
  args: UpdateModuleMediaRequest
): Promise<AxiosResponse<UpdateModuleMediaResponse>> => {
  const { mediaId, ...rest } = args;
  return axios.put(`/media/${mediaId}`, rest);
};
