import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import {
  blockedOrganisation,
  defaultOrganisation,
  newOrganisation,
  unlockedOrganisation
} from '@src/tests/pages/organisations/DefaultOrganisation';

const OrganisationsListMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganisations endpoint
  OrganisationsListMock.onPost(/\/organizations\/change-view\/\d+/)
    .reply(200, {
      success: true,
      message: 'View changed successfully',
      data: newOrganisation
    })
    .onPost(/\/organizations\/block\/\d+/)
    .reply(200, {
      success: true,
      message: 'Organisation blocked successfully',
      data: defaultOrganisation
    })
    .onPost(/\/organizations\/unblock\/\d+/)
    .reply(200, {
      success: true,
      message: 'Organisation unblocked successfully',
      data: defaultOrganisation
    })
    .onPost(/\/organizations\/filter/)
    .reply(200, {
      success: true,
      message: 'Organisation list fetched successfully',
      data: {
        rows: [newOrganisation, defaultOrganisation, blockedOrganisation, unlockedOrganisation],
        pagination: {
          total: 1,
          page: 1,
          row_per_page: 10
        }
      }
    });
};

export default OrganisationsListMock;
