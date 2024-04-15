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
