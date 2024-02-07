// ----------------------------------------------------------------------
import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';
import { PATH_DASHBOARD, PATH_ORGANISATIONS, PATH_PARAMETERS } from './paths';

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
  { title: <Trans>Gestion des rôles</Trans>, path: PATH_PARAMETERS.roles },
  { title: <Trans>Organisations</Trans>, path: PATH_PARAMETERS.organisations },
  { title: <Trans>Groupes</Trans>, path: PATH_PARAMETERS.groups },
  { title: <Trans>Utilisateurs</Trans>, path: PATH_PARAMETERS.users },
  { title: <Trans>Étudiants</Trans>, path: PATH_PARAMETERS.students },
  { title: <Trans>Testeurs externes</Trans>, path: PATH_PARAMETERS.externalTesters },
  { title: <Trans>Personnalisation</Trans>, path: PATH_PARAMETERS.customize }
];

const organizationsNavigationConfig = [
  {
    title: <Trans>Créer une organisation</Trans>,
    path: PATH_ORGANISATIONS.add
  }
];

// Global
// ----------------------------------------------------------------------
export const globalNavigationConfig = [
  ...generalNavigationConfig,
  ...parametersNavigationConfig,
  ...organizationsNavigationConfig
];

export interface globalNavigationConfigType {
  title: ReactNode;
  path: string;
  icon?: string;
}
