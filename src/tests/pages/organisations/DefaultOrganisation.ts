import { Organisation } from '@services/organisations/interfaces';

export const defaultOrganisation = {
  id: 1,
  name: 'Test Organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: true,
  address: 'Some address',
  city: 'Some city'
} as Organisation;

export const blockedOrganisation = {
  id: 3,
  name: 'Test Organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: false,
  address: 'Some address',
  city: 'Some city'
} as Organisation;

export const unlockedOrganisation = {
  id: 3,
  name: 'Test Organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: true,
  address: 'Some address',
  city: 'Some city'
} as Organisation;

export const newOrganisation = {
  id: 2,
  name: 'New organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: true,
  address: 'Some address',
  city: 'Some city'
} as Organisation;
