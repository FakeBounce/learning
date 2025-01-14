import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';
import {
  PATH_APPLICANTS,
  PATH_DASHBOARD,
  PATH_EXTERNAL_TESTERS,
  PATH_GROUPS,
  PATH_MODULES,
  PATH_ORGANIZATIONS,
  PATH_PARAMETERS,
  PATH_QUESTIONS,
  PATH_ROLES,
  PATH_USERS
} from './paths';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';

/**
 * Navigation configuration for the sidebar
 */
export const parametersNavigationConfig = [
  {
    title: <Trans>Gestion des rôles</Trans>,
    path: PATH_PARAMETERS.roles,
    restrictedTo: pageRestrictionsList.roles
  },
  {
    title: <Trans>Organisations</Trans>,
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

// GENERAL
// ----------------------------------------------------------------------
export const generalNavigationConfig = [
  { title: <Trans>Dashboard</Trans>, path: PATH_DASHBOARD.root, icon: 'dashicons:performance' },
  {
    title: <Trans>Liste des Parcours</Trans>,
    path: PATH_DASHBOARD.courses,
    icon: 'material-symbols:play-shapes'
  },
  {
    title: <Trans>Liste des modules</Trans>,
    path: PATH_MODULES.root,
    icon: 'uim:star-half-alt'
  }
];

const organizationsNavigationConfig = [
  {
    title: <Trans>Organisations</Trans>,
    path: PATH_ORGANIZATIONS.root
  },
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
    title: <Trans>Utilisateurs</Trans>,
    path: PATH_USERS.root
  },
  {
    title: <Trans>Profil</Trans>,
    path: PATH_USERS.profile
  },
  {
    title: <Trans>Modifier un utilisateur</Trans>,
    path: PATH_USERS.update
  },
  {
    title: <Trans>Ajouter en masse</Trans>,
    path: PATH_USERS.addBulk
  }
];

const applicantsNavigationConfig = [
  {
    title: <Trans>Étudiants</Trans>,
    path: PATH_APPLICANTS.root
  },
  {
    title: <Trans>Profil</Trans>,
    path: PATH_APPLICANTS.profile
  },
  {
    title: <Trans>Créer un étudiant</Trans>,
    path: PATH_APPLICANTS.add
  },
  {
    title: <Trans>Ajouter en masse</Trans>,
    path: PATH_APPLICANTS.addBulk
  }
];

const externalTestersNavigationConfig = [
  {
    title: <Trans>Testeurs</Trans>,
    path: PATH_EXTERNAL_TESTERS.root
  },
  {
    title: <Trans>Profil</Trans>,
    path: PATH_EXTERNAL_TESTERS.profile
  },
  {
    title: <Trans>Créer un testeur externe</Trans>,
    path: PATH_EXTERNAL_TESTERS.add
  }
];

const groupsNavigationConfig = [
  {
    title: <Trans>Groupes</Trans>,
    path: PATH_GROUPS.root
  },
  {
    title: <Trans>Ajouter un groupe</Trans>,
    path: PATH_GROUPS.add
  },
  {
    title: <Trans>Modifier un groupe</Trans>,
    path: PATH_GROUPS.update
  }
];

const rolesNavigationConfig = [
  {
    title: <Trans>Rôles</Trans>,
    path: PATH_ROLES.root
  },
  {
    title: <Trans>Ajouter un rôle</Trans>,
    path: PATH_ROLES.add
  },
  {
    title: <Trans>Modifier un rôle</Trans>,
    path: PATH_ROLES.update
  },
  {
    title: <Trans>Gestion des permissions</Trans>,
    path: PATH_ROLES.managePermission
  }
];

const modulesNavigationConfig = [
  {
    title: <Trans>Modules</Trans>,
    path: PATH_MODULES.root
  },
  {
    title: <Trans>Création d'un module</Trans>,
    path: PATH_MODULES.add
  },
  {
    title: <Trans>Détails d'un module</Trans>,
    path: PATH_MODULES.profile
  },
  {
    title: <Trans>Ajouter une vidéo</Trans>,
    path: PATH_MODULES.addVideo
  },
  {
    title: <Trans>Vidéo</Trans>,
    path: PATH_MODULES.videoDetail
  },
  {
    title: <Trans>Ajouter une image</Trans>,
    path: PATH_MODULES.addImage
  },
  {
    title: <Trans>Image</Trans>,
    path: PATH_MODULES.imageDetail
  },
  {
    title: <Trans>Ajouter un document</Trans>,
    path: PATH_MODULES.addDocument
  },
  {
    title: <Trans>Document</Trans>,
    path: PATH_MODULES.documentDetail
  },
  {
    title: <Trans>Ajouter un audio</Trans>,
    path: PATH_MODULES.addAudio
  },
  {
    title: <Trans>Audio</Trans>,
    path: PATH_MODULES.audioDetail
  }
];

const modulesQuestionsNavigationConfig = [
  {
    title: <Trans>Question : Vrai/Faux</Trans>,
    path: PATH_QUESTIONS.trueFalse
  },
  {
    title: <Trans>Question : Choix unique</Trans>,
    path: PATH_QUESTIONS.unique
  },
  {
    title: <Trans>Question : Choix multiple</Trans>,
    path: PATH_QUESTIONS.multiChoice
  },
  {
    title: <Trans>Question : Classifier</Trans>,
    path: PATH_QUESTIONS.classify
  },
  {
    title: <Trans>Question : Texte à trou</Trans>,
    path: PATH_QUESTIONS.gap
  },
  {
    title: <Trans>Question : Image cliquable</Trans>,
    path: PATH_QUESTIONS.picture
  },
  {
    title: <Trans>Question : Libre</Trans>,
    path: PATH_QUESTIONS.open
  }
];

// Global
// ----------------------------------------------------------------------
export const globalNavigationConfig = [
  ...generalNavigationConfig,
  ...organizationsNavigationConfig,
  ...usersNavigationConfig,
  ...applicantsNavigationConfig,
  ...externalTestersNavigationConfig,
  ...groupsNavigationConfig,
  ...rolesNavigationConfig,
  ...modulesNavigationConfig,
  ...modulesQuestionsNavigationConfig
];

export interface globalNavigationConfigType {
  title: ReactNode;
  path: string;
  icon?: string;
}
