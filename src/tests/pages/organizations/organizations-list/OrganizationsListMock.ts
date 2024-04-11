import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import {
  blockedOrganization,
  defaultOrganization,
  newOrganization,
  unlockedOrganization
} from '@src/tests/pages/organizations/DefaultOrganization';

const OrganizationsListMock = new MockAdapter(axios);

export const setupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  OrganizationsListMock.onPost(/\/organizations\/\d+\/change-view/)
    .reply(200, {
      success: true,
      message: { value: 'View changed successfully' },
      data: newOrganization
    })
    .onPost(/\/organizations\/\d+\/block/)
    .reply(200, {
      success: true,
      message: { value: 'Organization blocked successfully' },
      data: defaultOrganization
    })
    .onPost(/\/organizations\/\d+\/unblock/)
    .reply(200, {
      success: true,
      message: { value: 'Organization unblocked successfully' },
      data: defaultOrganization
    })
    .onPost(/\/organizations\/filter/)
    .reply(200, {
      success: true,
      message: { value: 'Organization list fetched successfully' },
      data: {
        rows: [newOrganization, defaultOrganization, blockedOrganization, unlockedOrganization],
        pagination: {
          total: 1,
          page: 1,
          row_per_page: 10
        }
      }
    });
};

export default OrganizationsListMock;
