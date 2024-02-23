import axios from '@utils/axios';
import { AxiosResponse } from 'axios';
import { UpdateOrganisationViewRequest, UpdateOrganisationViewResponse } from './interfaces';

export const updateOrganisationView = async (
  args: UpdateOrganisationViewRequest
): Promise<AxiosResponse<UpdateOrganisationViewResponse>> => {
  const { organisationId } = args;

  return axios.post(`/organizations/change-view/${organisationId}`);
};
