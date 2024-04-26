/*
 * API Request and Response
 * To change the organization view of the connected user
 */
import { ApiResponseMessage } from '@services/interfaces';
import { UserPermission } from '@services/permissions/interfaces';

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
  permissions: UserPermission[];
  mainOrganizationId: number;
  currentOrganization: ConnectedUserOrganization;
}

export interface UpdateOrganizationViewRequest {
  organizationId: number;
}

export interface UpdateOrganizationViewResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ConnectedUserOrganization;
}

export interface GetConnectedUserResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ConnectedUser;
}

export interface LoginInformations {
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginRequest {
  login: string;
  password: string;
  organizationUuid: string;
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

export interface ForgotPasswordRequest {
  email: string;
  organizationUuid: string;
}
