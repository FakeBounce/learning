import { ConnectedUser } from '@services/connected-user/interfaces';

export const defaultConnectedUser: ConnectedUser = {
  id: 3,
  login: 'thomascarrillo',
  email: 'tom@market-academy.com',
  firstname: 'Tomme',
  lastname: 'LAPOMME',
  isSuperAdmin: false,
  isClientAdmin: false,
  mainOrganizationId: 3,
  currentOrganization: {
    id: 3,
    logo: '/assets/shape_avatar.svg',
    name: 'Organisation de test',
    isActive: true,
    address: '14 Rue des Tadornes 34750 Villeneuve-lès-Maguelone France',
    city: 'Villeneuve-lès-Maguelone',
    useDoubleAuth: false,
    isMain: false
  },
  permissions: [
    {
      id: 3,
      name: 'see_groups'
    }
  ]
};

export const connectedUserClientAdmin: ConnectedUser = {
  id: 3,
  login: 'thomascarrillo',
  email: 'tom@market-academy.com',
  firstname: 'Tomme',
  lastname: 'LAPOMME',
  isSuperAdmin: false,
  isClientAdmin: true,
  mainOrganizationId: 3,
  currentOrganization: {
    id: 3,
    logo: '/assets/shape_avatar.svg',
    name: 'Organisation de test',
    isActive: true,
    address: '14 Rue des Tadornes 34750 Villeneuve-lès-Maguelone France',
    city: 'Villeneuve-lès-Maguelone',
    useDoubleAuth: false,
    isMain: false
  },
  permissions: [
    {
      id: 3,
      name: 'see_groups'
    }
  ]
};

export const connectedUserSuperAdmin: ConnectedUser = {
  id: 3,
  login: 'thomascarrillo',
  email: 'tom@market-academy.com',
  firstname: 'Tomme',
  lastname: 'LAPOMME',
  isSuperAdmin: true,
  isClientAdmin: false,
  mainOrganizationId: 3,
  currentOrganization: {
    id: 3,
    logo: '/assets/shape_avatar.svg',
    name: 'Organisation de test',
    isActive: true,
    address: '14 Rue des Tadornes 34750 Villeneuve-lès-Maguelone France',
    city: 'Villeneuve-lès-Maguelone',
    useDoubleAuth: false,
    isMain: false
  },
  permissions: [
    {
      id: 3,
      name: 'see_groups'
    }
  ]
};
