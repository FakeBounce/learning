import {
  ApiRequestSort,
  ApiResponseMessage,
  ApiResponsePagination
} from '../interfaces.ts';

export interface Organisation {
  id: number;
  logo: string;
  name: string;
  is_active: boolean;
  address: string;
  city: string;
  use_double_auth: boolean;
}
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

export interface GetOrganisationsResponseError {
  success: boolean;
  message: ApiResponseMessage;
  data: [];
}
