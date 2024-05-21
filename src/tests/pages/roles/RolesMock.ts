import MockAdapter from 'axios-mock-adapter';
import axios from '@utils/axios';
import {
  defaultRole,
  defaultRolePermissions,
  defaultRolesList
} from '@src/tests/pages/roles/DefaultRole';

const RolesMock = new MockAdapter(axios);
export const rolesSetupSuccessAxiosMock = () => {
  RolesMock.onPost(/\/roles\/filter/).reply(200, {
    success: true,
    message: { value: '', level: 'success' },
    data: {
      rows: defaultRolesList,
      pagination: {
        page: 1,
        row_per_page: 10,
        total_results: 1,
        total_pages: 1
      }
    }
  });

  /**
   * Mocks the response for the role creation
   */
  RolesMock.onPost(/\/roles/).reply(200, {
    success: true,
    message: {
      value: 'Le rôle a été créé avec succès.',
      level: 'success'
    },
    data: defaultRole
  });

  /**
   * Mocks the response for the role update
   */
  RolesMock.onPut(/\/roles\/\d+/).reply(200, {
    success: true,
    message: {
      value: 'Le rôle a été modifié avec succès.',
      level: 'success'
    },
    data: defaultRole
  });

  /**
   * Mocks the response for the role deletion
   */
  RolesMock.onDelete(/\/roles\/\d+/).reply(200, {
    success: true,
    message: {
      value: 'Le rôle a été supprimé avec succès.',
      level: 'success'
    }
  });

  /**
   * Mocks the response for the role permissions
   */
  RolesMock.onGet(/\/roles\/\d+\/permissions/).reply(200, {
    success: true,
    message: {
      value: '',
      level: 'success'
    },
    data: defaultRolePermissions
  });
};

export const rolesSetupErrorAxiosMock = () => {
  /**
   * Mocks the response for the role deletion
   */
  RolesMock.onDelete(/\/roles\/\d+/).reply(500, {
    success: false,
    message: {
      value: 'Il y a eu une erreur lors de la suppression du rôle. Veuillez réessayer plus tard.',
      level: 'error'
    }
  });
};

export default RolesMock;
