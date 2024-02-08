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
