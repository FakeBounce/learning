import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import { newOrganization } from '@src/tests/pages/organizations/DefaultOrganization';

const HeaderMock = new MockAdapter(axios);

export const headerSetupSuccessAxiosMock = () => {
  // Mock the createOrganizations endpoint
  HeaderMock.onPost(/\/organizations\/\d+\/change-view/).reply(200, {
    success: true,
    message: { value: 'View changed successfully' },
    data: newOrganization
  });
};

export default HeaderMock;
