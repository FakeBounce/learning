import LoadableComponent from './LoadableComponent';
import { lazy } from 'react';
// ----------------------------------------------------------------------

// AUTH
export const LoginPage = LoadableComponent(lazy(() => import('@src/pages/login/LoginPage')));

// MAIN
export const Page404 = LoadableComponent(lazy(() => import('../pages/Page404')));

// Organisations

export const Organisations = LoadableComponent(
  lazy(() => import('@src/pages/organisations/organisations-list/OrganisationsList'))
);
export const OrganisationsCreate = LoadableComponent(
  lazy(() => import('@src/pages/organisations/organisations-create/OrganisationsCreate'))
);

export const OrganisationsUpdate = LoadableComponent(
  lazy(() => import('@src/pages/organisations/organisations-update/OrganisationsUpdate'))
);

//Users

export const Users = LoadableComponent(lazy(() => import('@src/pages/users/users-list/UsersList')));
