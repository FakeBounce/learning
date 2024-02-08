/*
 * API Request and Response
 * To change the organisation view of the user
 */
import { ApiResponseMessage } from '@services/interfaces';

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
