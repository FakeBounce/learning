import { ApiResponseMessage, ApiResponsePagination, TableRequestConfig } from '../interfaces';

export interface Organization {
  id: number;
  logo: string;
  name: string;
  isActive: boolean;
  address: string;
  city: string;
  useDoubleAuth: boolean;
}

/*
 * API Request and Response
 * To get a specific organization
 */

export interface GetSingleOrganizationResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organization;
}

/*
 * API Request and Response
 * To get a list of organizations
 */
export interface GetOrganizationsRequest extends TableRequestConfig {}

export interface GetOrganizationsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: Organization[];
    pagination: ApiResponsePagination;
  };
}

/*
 * API Request and Response
 * To toggle organization block
 */
export interface UpdateOrganizationsBlockRequest {
  setActive: boolean;
  organizationId: number;
}

export interface UpdateOrganizationsBlockResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organization;
}

/*
 * API Request and Response
 * To create an organization
 */
export interface CreateOrganizationsRequest {
  name: string;
  addressId: string;
  logo: File | string;
  useDoubleAuth: boolean;
  clientAdmin: {
    login: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

export interface CreateOrganizationsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organization;
}

/*
 * API Request and Response
 * To create an organization
 */
export interface UpdateOrganizationsRequest {
  id: number;
  name?: string;
  addressId?: string;
  logo?: File | string;
}

export interface UpdateOrganizationsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organization;
}
