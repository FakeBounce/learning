import { User, UserForBulk } from '@services/users/interfaces';

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

export const defaultInactiveUser = {
  id: 14,
  lastname: 'ina',
  firstname: 'ctiveUser',
  login: 'inaUser',
  email: 'inactive@user.fr',
  isActive: false,
  useDoubleAuth: false,
  groups: [
    {
      id: 1,
      name: 'main',
      description: null,
      isMain: true,
      nbUsers: null
    },
    {
      id: 2,
      name: 'Test',
      description: null,
      isMain: false,
      nbUsers: 2
    }
  ],
  roles: []
};

export const defaultUsersList: User[] = [
  {
    id: 2,
    lastname: 'zazi',
    firstname: 'thierry',
    login: 'test',
    email: 'zazi@thierry.com',
    isActive: true,
    useDoubleAuth: true,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        isMain: true,
        nbUsers: null
      }
    ],
    roles: [
      {
        id: 2,
        name: 'client-admin',
        description: '',
        isClientAdmin: true
      },
      {
        id: 9,
        name: 'aaaa',
        description: 'bbdvre',
        isClientAdmin: false
      }
    ]
  },
  {
    id: 9,
    lastname: 'toto',
    firstname: 'testa',
    login: 'gabrielletestp',
    email: 'gabrielle+testp@market-academy.com',
    isActive: true,
    useDoubleAuth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        isMain: true,
        nbUsers: null
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
    isActive: true,
    useDoubleAuth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        isMain: true,
        nbUsers: null
      }
    ],
    roles: []
  },
  {
    id: 11,
    lastname: 'Jamin2',
    firstname: 'Ben',
    login: 'benjo',
    email: 'benjamin+1@market-academy.com',
    isActive: true,
    useDoubleAuth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        isMain: true,
        nbUsers: null
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
    isActive: true,
    useDoubleAuth: false,
    groups: [
      {
        id: 1,
        name: 'main',
        description: null,
        isMain: true,
        nbUsers: null
      },
      {
        id: 2,
        name: 'Test',
        description: null,
        isMain: false,
        nbUsers: 2
      }
    ],
    roles: []
  }
];
