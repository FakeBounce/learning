import { Group } from '@services/groups/interfaces';

export const defaultGroup = {
  id: 3,
  name: 'test group',
  description: 'Une petite description sympa',
  isMain: false,
  nbUsers: 0
};

export const defaultGroupsList: Group[] = [
  {
    id: 4,
    name: 'test group',
    description: 'Une petite description sympa',
    isMain: false,
    nbUsers: 0,
    roles: [
      {
        id: 2,
        name: 'client-admin',
        description: 'Un client',
        isClientAdmin: true
      }
    ]
  },
  {
    id: 5,
    name: 'test group 2',
    description: 'Une petite description sympa',
    isMain: false,
    nbUsers: 0
  },
  {
    id: 6,
    name: 'test group 3',
    description: 'Une petite description sympa',
    isMain: false,
    nbUsers: 0
  },
  {
    id: 7,
    name: 'test group 4',
    description: 'HAHHAHAHAHAHAHAHAHAHAHA',
    isMain: true,
    nbUsers: 5
  }
];
