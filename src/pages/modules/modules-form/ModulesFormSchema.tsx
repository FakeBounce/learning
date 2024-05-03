import { yupResolver } from '@hookform/resolvers/yup';
import { Trans } from '@lingui/macro';
import { BasicOption } from '@services/interfaces';
import * as Yup from 'yup';
import { Module, ModuleDisplayAnswers } from '@services/modules/interfaces';
import { setTimeToDate } from '@utils/helpers/timeConvertors';

/**
 * This is a static array of tags to test while waiting the API
 */
export const colourOptions: readonly BasicOption[] = [
  // { value: 'ocean', label: 'Ocean' },
  // { value: 'blue', label: 'Blue' },
  // { value: 'purple', label: 'Purple' },
  // { value: 'red', label: 'Red' },
  // { value: 'orange', label: 'Orange' },
  // { value: 'yellow', label: 'Yellow' },
  // { value: 'green', label: 'Green' },
  // { value: 'forest', label: 'Forest' },
  // { value: 'slate', label: 'Slate' },
  // { value: 'silver', label: 'Silver' }
];

export const answersOptions = [
  {
    value: ModuleDisplayAnswers.AFTER_QUESTION,
    label: <Trans>Après chaque question</Trans>
  },
  {
    value: ModuleDisplayAnswers.AFTER_ATTEMPTS,
    label: <Trans>Après chaque essai</Trans>
  },
  {
    value: ModuleDisplayAnswers.END,
    label: <Trans>À la fin du module</Trans>
  },
  {
    value: ModuleDisplayAnswers.NEVER,
    label: <Trans>Jamais</Trans>
  }
];

export const languagesOptions = [
  {
    value: 1,
    label: 'Français'
  },
  {
    value: 2,
    label: 'English'
  }
];

export interface ModuleFormValues {
  media?: File | null;
  timer: Date;
  nbAttempts: number;
  successRate: number;
  displayAnswers: string;
  isLocked: boolean;
  isPublic: boolean;
  title: string;
  languageId: number;
  description: string;
  tags?: BasicOption[];
}

export const populateModuleForm = (module: Module) => {
  return {
    media: undefined,
    timer: setTimeToDate(module.timer),
    nbAttempts: module.nbAttempts,
    successRate: module.successRate,
    displayAnswers: module.displayAnswers,
    isLocked: !!module.isLocked,
    isPublic: !!module.isPublic,
    title: module.title,
    languageId: module.language === 'french' ? 1 : 2,
    description: module.description,
    tags: module.tags.map((tag) => ({ value: tag.label, label: tag.label }))
  } as ModuleFormValues;
};

export const modulesFormDefaultValues: ModuleFormValues = {
  media: undefined,
  timer: new Date(new Date().setHours(0, 0, 0, 0)),
  nbAttempts: 0,
  successRate: 0,
  displayAnswers: answersOptions[0].value,
  isLocked: false,
  isPublic: false,
  title: '',
  languageId: 1,
  description: '',
  tags: []
};

export const modulesFormSchema = yupResolver(
  Yup.object().shape({
    media: Yup.mixed<File>().nullable().optional(),
    timer: Yup.date()
      .required('La durée est requise')
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        'La durée ne peut être inférieure à 0 secondes'
      )
      .max(
        new Date(new Date().setHours(23, 59, 59, 999)),
        'La durée doit être faire moins de 24 heures'
      ),
    nbAttempts: Yup.number().required('Le nombre de tentatives est requis'),
    successRate: Yup.number().min(0).max(100).required('Le taux de réussite est requis'),
    displayAnswers: Yup.string().required("L'affichage des réponses est requis"),
    isLocked: Yup.boolean().required('Le verrouillage est requis'),
    isPublic: Yup.boolean().required('La visibilité est requise'),
    title: Yup.string().required('Le nom du module est requis'),
    languageId: Yup.number().required('La langue du module est requise'),
    description: Yup.string().required('La description est requise'),
    tags: Yup.array().optional()
  })
);
