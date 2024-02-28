/*
 * API Request and Response
 * To change the organisation view of the connected user
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
  organization_id: number;
  is_active: boolean;
  email_verified_at: Date;
  use_double_auth: boolean;
  groups: Group[];
  roles: [];
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
