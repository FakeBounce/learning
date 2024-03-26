import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';
import { PATH_DASHBOARD, PATH_ORGANIZATIONS, PATH_PARAMETERS, PATH_USERS } from './paths';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';

// GENERAL
// ----------------------------------------------------------------------
export const generalNavigationConfig = [
  { title: <Trans>Dashboard</Trans>, path: PATH_DASHBOARD.root, icon: 'dashicons:performance' },
  {
    title: <Trans>Liste des Parcours</Trans>,
    path: PATH_DASHBOARD.courseList,
    icon: 'material-symbols:play-shapes'
  },
  {
    title: <Trans>Liste des modules</Trans>,
    path: PATH_DASHBOARD.modulesList,
    icon: 'uim:star-half-alt'
  }
];

// Parameters
// ----------------------------------------------------------------------
export const parametersNavigationConfig = [
  {
    title: <Trans>Gestion des rôles</Trans>,
    path: PATH_PARAMETERS.roles,
    restrictedTo: pageRestrictionsList.roles
  },
  {
    title: <Trans>Organizations</Trans>,
    path: PATH_PARAMETERS.organizations,
    restrictedTo: pageRestrictionsList.organizations
  },
  {
    title: <Trans>Groupes</Trans>,
    path: PATH_PARAMETERS.groups,
    restrictedTo: pageRestrictionsList.groups
  },
  {
    title: <Trans>Utilisateurs</Trans>,
    path: PATH_PARAMETERS.users,
    restrictedTo: pageRestrictionsList.users
  },
  {
    title: <Trans>Étudiants</Trans>,
    path: PATH_PARAMETERS.applicants,
    restrictedTo: pageRestrictionsList.applicants
  },
  {
    title: <Trans>Testeurs externes</Trans>,
    path: PATH_PARAMETERS.externalTesters,
    restrictedTo: pageRestrictionsList.externalTesters
  },
  {
    title: <Trans>Personnalisation</Trans>,
    path: PATH_PARAMETERS.customize,
    restrictedTo: pageRestrictionsList.customize
  }
];

const organizationsNavigationConfig = [
  {
    title: <Trans>Créer une organisation</Trans>,
    path: PATH_ORGANIZATIONS.add
  },
  {
    title: <Trans>Modifier une organisation</Trans>,
    path: PATH_ORGANIZATIONS.update
  }
];

const usersNavigationConfig = [
  {
    title: <Trans>Profil</Trans>,
    path: PATH_USERS.profile
  },
  {
    title: <Trans>Modifier un utilisateur</Trans>,
    path: PATH_USERS.edit
  }
];

// Global
// ----------------------------------------------------------------------
export const globalNavigationConfig = [
  ...generalNavigationConfig,
  ...parametersNavigationConfig,
  ...organizationsNavigationConfig,
  ...usersNavigationConfig
];

export interface globalNavigationConfigType {
  title: ReactNode;
  path: string;
  icon?: string;
}
