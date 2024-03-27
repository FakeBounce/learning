/*
 * API Request and Response
 * To change the organization view of the connected user
 */
import { ApiResponseMessage } from '@services/interfaces';
import { PermissionTypeList } from '@services/permissions/interfaces';

export interface ConnectedUserOrganization {
  id: number;
  logo: string;
  isActive: boolean;
  isMain: boolean;
  name: string;
  useDoubleAuth: boolean;
  city: string;
  address: string;
}

export interface ConnectedUser {
  id: number;
  lastname: string;
  firstname: string;
  login: string;
  email: string;
  isClientAdmin: boolean;
  isSuperAdmin: boolean;
  permissions: PermissionTypeList;
  currentOrganization: ConnectedUserOrganization;
}

export interface ConnectedUserOrganizationFromAPI {
  id: number;
  logo: string;
  is_active: boolean;
  is_main: boolean;
  name: string;
  use_double_auth: boolean;
  city: string;
  address: string;
}

export interface ConnectedUserFromAPI {
  id: number;
  lastname: string;
  firstname: string;
  login: string;
  email: string;
  is_client_admin: boolean;
  is_super_admin: boolean;
  permissions: PermissionTypeList;
  current_organisation: ConnectedUserOrganizationFromAPI;
}

export interface UpdateOrganizationViewRequest {
  organizationId: number;
}

export interface UpdateOrganizationViewResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ConnectedUserOrganizationFromAPI;
}

export interface GetConnectedUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ConnectedUserFromAPI;
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
