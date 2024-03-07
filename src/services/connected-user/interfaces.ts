/*
 * API Request and Response
 * To change the organization view of the connected user
 */
import { ApiResponseMessage } from '@services/interfaces';
import { Group } from '@services/groups/interfaces';

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  login: string;
  email: string;
  password: string;
  organizationId?: number;
  isActive: boolean;
  emailVerifiedAt?: Date;
  useDoubleAuth: boolean;
  groups: Group[];
  roles: [];
}

export interface UserFromAPI {
  id: number;
  lastname: string;
  firstname: string;
  login: string;
  email: string;
  password: string;
  organization_id?: number;
  is_active: boolean;
  email_verified_at?: Date;
  use_double_auth: boolean;
  groups: Group[];
  roles: [];
}

export interface UpdateOrganizationViewRequest {
  organizationId: number;
}

export interface UpdateOrganizationViewResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    id: number;
  };
}

export interface GetConnectedUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: UserFromAPI;
}

export interface LoginInformations {
  token: string;
  refresh_token: string;
  expires_at: string;
}

export interface LoginRequest {
  login: string;
  password: string;
  organization_uuid: string;
}

export interface LoginResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: LoginInformations;
}

export interface LogoutResponse {
  success: boolean;
  message: ApiResponseMessage;
  data?: any; // @TODO: Define the data
}
