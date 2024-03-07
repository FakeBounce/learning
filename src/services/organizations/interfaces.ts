import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '../interfaces';

export interface Organization {
  id: number;
  logo: string;
  name: string;
  is_active: boolean;
  address: string;
  city: string;
  use_double_auth: boolean;
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
export interface GetOrganizationsRequest {
  currentPage: number;
  rowsPerPage: number;
  sort?: ApiRequestSort;
  filters?: any;
}

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
  address_id: string;
  logo: File | string;
  use_double_auth: 0 | 1;
  client_admin: {
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
  address_id?: string;
  logo?: File | string;
}

export interface UpdateOrganizationsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organization;
}
