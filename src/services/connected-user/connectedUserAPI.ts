import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import {
  ForgotPasswordRequest,
  GetConnectedUserResponse,
  LoginRequest,
  LoginResponse,
  UpdateOrganizationViewRequest,
  UpdateOrganizationViewResponse
} from './interfaces';

export const updateOrganizationView = async (
  args: UpdateOrganizationViewRequest
): Promise<AxiosResponse<UpdateOrganizationViewResponse>> => {
  const { organizationId } = args;

  return axios.post(`/organizations/${organizationId}/change-view`);
};

export const getUser = async (): Promise<AxiosResponse<GetConnectedUserResponse>> => {
  return axios.get('/user');
};

export const login = async (args: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post('/users/login', args);
};

export const refresh = async (): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post('/users/refresh');
};

export const logout = async (): Promise<AxiosResponse<LoginResponse>> => {
  return axios.delete('/users/logout');
};

export const forgotPassword = async (args: ForgotPasswordRequest): Promise<AxiosResponse> => {
  return axios.post('/users/forgot-password', args);
}
