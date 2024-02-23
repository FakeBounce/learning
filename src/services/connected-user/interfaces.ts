/*
 * API Request and Response
 * To change the organisation view of the connected user
 */
import { ApiResponseMessage } from '@services/interfaces';

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  login: string;
  email: string;
  password: string;
  organization_id: number;
  is_active: boolean;
  email_verified_at: Date;
  use_double_auth: boolean;
}

export interface UpdateOrganisationViewRequest {
  organisationId: number;
}

export interface UpdateOrganisationViewResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    id: number;
  };
}
