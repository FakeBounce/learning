import { MediaType, ModuleCompositionItemType, QuestionType } from '@services/modules/interfaces';
import { t } from '@lingui/macro';

export const moduleContentTypes = [
  {
    label: t`Document`,
    value: MediaType.DOCUMENT
  },
  {
    label: t`Question`,
    value: ModuleCompositionItemType.QUESTION
  },
  {
    label: t`Image`,
    value: MediaType.IMAGE
  },
  {
    label: t`Vidéo`,
    value: MediaType.VIDEO
  },
  {
    label: t`Audio`,
    value: MediaType.AUDIO
  }
];

export const moduleQuestionTypes = [
  {
    label: t`Vrai / Faux`,
    value: QuestionType.TRUE_FALSE
  },
  {
    label: t`Case à cocher`,
    value: QuestionType.CHECKBOX
  },
  {
    label: t`Choix multiple`,
    value: QuestionType.MULTIPLE_CHOICE
  },
  {
    label: t`Texte à trou`,
    value: QuestionType.TEXT_WITH_HOLE
  },
  {
    label: t`Image cliquable`,
    value: QuestionType.CLICKABLE_IMAGE
  },
  {
    label: t`Question libre`,
    value: QuestionType.FREE_TEXT
  }
];
