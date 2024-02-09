import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '../interfaces';

export interface Organisation {
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
 * To get a specific organisation
 */

export interface GetSingleOrganisationResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organisation;
}

/*
 * API Request and Response
 * To get a list of organisations
 */
export interface GetOrganisationsRequest {
  currentPage: number;
  rowsPerPage: number;
  sort?: ApiRequestSort;
  filters?: any;
}

export interface GetOrganisationsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: Organisation[];
    pagination: ApiResponsePagination;
  };
}

/*
 * API Request and Response
 * To toggle organisation block
 */
export interface UpdateOrganisationsBlockRequest {
  setActive: boolean;
  organisationId: number;
}

export interface UpdateOrganisationsBlockResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organisation;
}

/*
 * API Request and Response
 * To create an organisation
 */
export interface CreateOrganisationsRequest {
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

export interface CreateOrganisationsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organisation;
}


/*
 * API Request and Response
 * To create an organisation
 */
export interface UpdateOrganisationsRequest {
  id: number;
  name?: string;
  address_id?: string;
  logo?: File | string;
}

export interface UpdateOrganisationsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Organisation;
}
