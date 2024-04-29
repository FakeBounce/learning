import { UserForBulk } from '@services/users/interfaces';

export const validRowsForUsersBulk = [
  {
    firstname: 'Améthyste',
    lastname: 'Supernom',
    email: 'superam@kyste.fr',
    login: 'superam'
  },
  {
    firstname: 'Parapluie',
    lastname: 'Lenom',
    email: 'para@pluie.com',
    login: 'LKDAL209'
  },
  {
    firstname: 'yaller',
    lastname: 'jdois',
    email: 'jdoisyaller@vite.com',
    login: 'azfdazf'
  }
] as UserForBulk[];

export const faultyRowsForUsersBulk = [
  {
    email: 'faultyrow@bulk.fr',
    firstname: 'faulty',
    lastname: 'row',
    login: ''
  }
] as UserForBulk[];

export const defaultUsersList = [
  {
    id: 2,
    lastname: 'zazi',
    firstname: 'thierry',
    login: 'test',
    email: 'zazi@thierry.com',
    is_active: true,
    use_double_auth: true,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        is_main: true,
        nb_users: null
      }
    ],
    roles: [
      {
        id: 2,
        name: 'client-admin',
        description: null,
        is_client_admin: true
      },
      {
        id: 9,
        name: 'aaaa',
        description: 'bbdvre',
        is_client_admin: false
      }
    ]
  },
  {
    id: 9,
    lastname: 'toto',
    firstname: 'testa',
    login: 'gabrielletestp',
    email: 'gabrielle+testp@market-academy.com',
    is_active: true,
    use_double_auth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        is_main: true,
        nb_users: null
      }
    ],
    roles: []
  },
  {
    id: 10,
    lastname: 'Jamin',
    firstname: 'Ben',
    login: 'benjamin',
    email: 'ben@jamin.fr',
    is_active: true,
    use_double_auth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        is_main: true,
        nb_users: null
      }
    ],
    roles: []
  },
  {
    id: 11,
    lastname: 'Jamin',
    firstname: 'Ben',
    login: 'benjo',
    email: 'benjamin+1@market-academy.com',
    is_active: true,
    use_double_auth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        is_main: true,
        nb_users: null
      }
    ],
    roles: []
  },
  {
    id: 12,
    lastname: 'Supernom',
    firstname: 'Améthyste',
    login: 'zdjaoz',
    email: 'superam@kyste.fr',
    is_active: true,
    use_double_auth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        is_main: true,
        nb_users: null
      },
      {
        id: 2,
        name: 'Test',
        description: null,
        is_main: false,
        nb_users: 2
      }
    ],
    roles: []
  }
];
