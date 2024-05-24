import * as Yup from 'yup';
import { t } from '@lingui/macro';
import { onlyFileValidator } from '@utils/helpers/validators';

export const modulesQuestionFormSchema = Yup.object().shape({
  title: Yup.string().required(t`L'énoncé est requis`),
  explanation: Yup.string(),
  nbPoints: Yup.number()
    .required(t`Le nombre de points est requis`)
    .min(1, t`Le nombre de points doit être supérieur à 0`),
  answersRandomOrder: Yup.boolean().required(t`L'ordre aléatoire des réponses est requis`),
  isEliminatory: Yup.boolean().required(t`Le statut éliminatoire est requis`),
  media: onlyFileValidator,
  answers: Yup.mixed<any>().optional()
});

export const modulesQuestionFormTrueFalseSchema = modulesQuestionFormSchema.shape({
  answers: Yup.string().required(t`La réponse est requise`)
});

const answerSchema = Yup.object().shape({
  content: Yup.string().required(t`Le contenu est requis`),
  rightAnswer: Yup.boolean().required(t`La réponse correcte est requise`),
  id: Yup.string().required(t`L'identifiant est requis`)
});

export const modulesQuestionFormChoicesSchema = modulesQuestionFormSchema.shape({
  answers: Yup.array()
    .of(answerSchema)
    .required(t`Les réponses sont requises`)
    .min(1, t`Au moins une réponse est requise`)
});

export const modulesQuestionGapSchema = modulesQuestionFormSchema.shape({
  content: Yup.string().required(t`Le contenu est requis`),
  gapNb: Yup.number().required(t`Le numéro de l'écart est requis`),
  trapWord: Yup.boolean().required(t`Le mot piège est requis`)
});

export const modulesQuestionClassifySchema = modulesQuestionFormSchema.shape({
  content: Yup.string().required(t`Le contenu est requis`),
  proposalNb: Yup.number().required(t`Le numéro de la proposition est requis`),
  proposal: Yup.string().required(t`La proposition est requise`)
});

export const modulesQuestionPictureSchema = modulesQuestionFormSchema.shape({
  nbErrorsAllowed: Yup.number()
    .required(t`Le nombre d'erreurs autorisées est requis`)
    .min(0, t`Le nombre d'erreurs autorisées doit être supérieur ou égal à 0`),
  content: Yup.string().required(t`Le contenu est requis`),
  idZone: Yup.number().required(t`L'identifiant de la zone est requis`),
  zone: Yup.object()
    .shape({
      x1: Yup.number().required(t`La coordonnée x1 est requise`),
      y1: Yup.number().required(t`La coordonnée y1 est requise`),
      x2: Yup.number().required(t`La coordonnée x2 est requise`),
      y2: Yup.number().required(t`La coordonnée y2 est requise`),
      x3: Yup.number().required(t`La coordonnée x3 est requise`),
      y3: Yup.number().required(t`La coordonnée y3 est requise`),
      x4: Yup.number().required(t`La coordonnée x4 est requise`),
      y4: Yup.number().required(t`La coordonnée y4 est requise`)
    })
    .required(t`La zone est requise`),
  explanation: Yup.string().required(t`L'explication est requise`)
});

interface ModulesQuestionForm {
  title: string;
  explanation?: string;
  nbPoints: number;
  answersRandomOrder: boolean;
  isEliminatory: boolean;
  nbErrorsAllowed?: number;
  media?: File;
}

export type ModulesQuestionFormTrueFalse = ModulesQuestionForm & {
  answers: string;
};

export type ModulesQuestionFormChoices = ModulesQuestionForm & {
  answers: FieldChoiceItem[];
};

export interface FieldChoiceItem {
  id: string;
  content: string;
  rightAnswer: boolean;
}

const moduleQuestionDefaultValues = {
  title: '',
  explanation: '',
  nbPoints: 0,
  answersRandomOrder: false,
  isEliminatory: false,
  nbErrorsAllowed: 0,
  media: undefined
};

export const moduleQuestionDefaultValuesTrueFalse = {
  ...moduleQuestionDefaultValues,
  answers: ''
};

export const moduleQuestionDefaultChoices = {
  ...moduleQuestionDefaultValues,
  answers: []
};
