import { Organization } from '@services/organizations/interfaces';

export const defaultOrganization = {
  id: 1,
  name: 'Test Organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: true,
  address: 'Some address',
  city: 'Some city'
} as Organization;

export const blockedOrganization = {
  id: 3,
  name: 'Blocked Organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: false,
  address: 'Some address',
  city: 'Some city'
} as Organization;

export const unlockedOrganization = {
  id: 4,
  name: 'Unlocked Organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: true,
  address: 'Some address',
  city: 'Some city'
} as Organization;

export const newOrganization = {
  id: 2,
  name: 'New organisation',
  logo: 'Some logo url',
  use_double_auth: false,
  is_active: true,
  address: 'Some address',
  city: 'Some city'
} as Organization;
