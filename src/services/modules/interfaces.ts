import {
  ApiRequestSort,
  ApiResponseMessage,
  ApiResponsePagination,
  FilterBy
} from '@services/interfaces';
import { Group } from '@services/groups/interfaces';

export enum ModuleDisplayAnswers {
  AFTER_QUESTION = 'after_question',
  END = 'end',
  NEVER = 'never',
  AFTER_ATTEMPTS = 'after_attempts'
}

export enum ModuleStatusEnum {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  IN_CORRECTION = 'in_correction'
}

export enum ModuleUserRightEnum {
  OWNER = 'owner',
  CONTRIBUTOR = 'contributor',
  SUPERVISOR = 'supervisor',
  VIEWER = 'viewer'
}

export enum ModulesActions {
  SEE = 'see',
  DASHBOARD = 'dashboard',
  DUPLICATE = 'duplicate',
  SEND = 'send',
  SHARE = 'share',
  TRY = 'try',
  NEW_VERSION = 'new_version',
  EDIT = 'edit',
  DELETE = 'delete',
  CANCEL = 'cancel',
  ARCHIVE = 'archive',
  LOCK_UNLOCK = 'lock_unlock'
}

export interface ModuleRights {
  users: ModuleRightUser[];
  groups: Group[];
}

export interface ModuleRightUser {
  id: number;
  login: string;
  right: ModuleUserRightEnum;
}

export interface Tag {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  label: string;
  taggable_type: string;
  taggable_id: number;
  organization_id: number;
}

export interface Module {
  composition: (ModuleCompositionItem | ModuleCompositionItemNested)[];
  description: string;
  displayAnswers: ModuleDisplayAnswers;
  id: number;
  isLastPublishedOrArchivedVersion: boolean;
  isLastVersion: boolean;
  isLocked: boolean;
  isPublic: boolean;
  language: string;
  media: string[];
  nbAttempts: number;
  parentId: number | null;
  rights: ModuleRights;
  successRate: number;
  status: ModuleStatusEnum;
  tags: Tag[];
  timer: string;
  title: string;
  updatedAt: Date;
  version: number;
}

export interface ModuleSubject {
  id: number;
  position: number;
  questions: number[];
  title: string;
}

export interface ModuleMedia {
  id: number;
  position: number;
  type: ModuleCompositionItemType;
  mediaType: MediaType;
  name: string;
  path?: string;
  file?: string;
}

export enum ModuleCompositionItemType {
  SUBJECT = 'subject',
  QUESTION = 'question',
  MEDIA = 'media'
}

export enum QuestionType {
  TRUE_FALSE = 'true_false',
  CHECKBOX = 'unique_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
  CLASSIFY_IN_ORDER = 'classify_in_order',
  TEXT_WITH_HOLE = 'gap_fill_text',
  CLICKABLE_IMAGE = 'select_on_picture',
  FREE_TEXT = 'open_question'
}

export enum MediaType {
  DOCUMENT = 'file',
  IMAGE = 'image',
  GIF = 'gif',
  AUDIO = 'audio',
  VIDEO = 'video'
}

export interface ModuleCompositionItemNested {
  name: string;
  id: number;
  type: ModuleCompositionItemType;
  path?: string;
  mediaType?: MediaType;
}

export interface ModuleCompositionItem {
  name: string;
  id: number;
  type: ModuleCompositionItemType;
  composition: ModuleCompositionItemNested[];
}

export interface CreateModuleRequest {
  media: File;
  timer: string;
  nbAttempts: number;
  successRate: number;
  displayAnswers: ModuleDisplayAnswers;
  isLocked: boolean;
  isPublic: boolean;
  title: string;
  languageId: number;
  description: string;
  tags: string[];
}

export interface CreateModuleResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

export interface GetModulesRequest {
  currentPage: number;
  rowsPerPage: number;
  sort?: ApiRequestSort;
  filters?: FilterBy;
}

export interface GetModulesResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    pagination: ApiResponsePagination;
    rows: Module[];
  };
}

export interface GetSingleModuleRequest {
  id: number;
}

export interface GetSingleModuleResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

export interface CreateModuleSubjectRequest {
  title: string;
  moduleId: number;
}

export interface CreateModuleSubjectResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ModuleSubject;
}

export interface DeleteModuleSubjectRequest {
  subjectId: number;
}

export interface DeleteModuleSubjectResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

export interface MoveModuleSubjectRequest {
  subjectId: number;
  newPosition: number;
}

export interface MoveModuleSubjectResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

interface CreateModuleMediaRequestTypes {
  subjectId?: number;
  courseId?: number;
  moduleId?: number;
  mediaType: MediaType;
  url?: string;
  file?: File;
  name: string;
}

// Utility type to enforce the presence of at least one of the keys
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type CreateModuleMediaRequest = RequireAtLeastOne<
  CreateModuleMediaRequestTypes,
  'subjectId' | 'courseId' | 'moduleId'
>;

export interface CreateModuleMediaResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ModuleMedia;
}

export type DeleteModuleMediaRequest = {
  mediaId: number;
};

export interface DeleteModuleMediaResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

export type MoveModuleMediaRequest = {
  mediaId: number;
  position: number;
};

export interface MoveModuleMediaResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

export type UpdateModuleMediaRequest = {
  mediaId: number;
  name?: string;
  url?: string;
  file?: File;
  mediaType?: MediaType;
};

export interface UpdateModuleMediaResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ModuleMedia;
}

export interface ModuleQuestionAnswerChoices {
  content: string;
  // @TODO Wait API change for boolean
  rightAnswer: 1 | 0;
}

export interface ModuleQuestionAnswerClassify {
  content: string;
  proposalNb: number;
  proposal: string;
}

export interface ModuleQuestionAnswerGap {
  content: string;
  gapNb: number;
  trapWord: boolean;
}

export interface ModuleQuestionAnswerPicture {
  content: string;
  idZone: number;
  zone: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    x4: number;
    y4: number;
  };
  explanation: string;
}

export interface ModuleQuestion {
  id: number;
  title: string;
  explanation?: string;
  nbPoints: number;
  questionType: QuestionType;
  moduleId: number;
  subjectId?: number;
  answersRandomOrder: boolean;
  isEliminatory: boolean;
  nbErrorsAllowed: number;
  media?: string;
  answers: (
    | ModuleQuestionAnswerChoices
    | ModuleQuestionAnswerClassify
    | ModuleQuestionAnswerGap
    | ModuleQuestionAnswerPicture
  )[];
}

export interface CreateModuleQuestionRequest {
  subjectId?: number;
  courseId?: number;
  moduleId: number;
  title: string;
  explanation?: string;
  nbPoints: number;
  questionType: QuestionType;
  // @TODO Wait API change for boolean
  answersRandomOrder: 1 | 0;
  isEliminatory: 1 | 0;
  nbErrorsAllowed: number;
  media?: File;
  answers: (
    | ModuleQuestionAnswerChoices
    | ModuleQuestionAnswerClassify
    | ModuleQuestionAnswerGap
    | ModuleQuestionAnswerPicture
  )[];
}

export interface CreateModuleQuestionResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ModuleQuestion;
}

export type DeleteModuleQuestionRequest = {
  questionId: number;
};

export interface DeleteModuleQuestionResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

export type MoveModuleQuestionRequest = {
  questionId: number;
  newPosition: number;
};

export interface MoveModuleQuestionResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Module;
}

export interface UpdateModuleQuestionRequest extends Partial<ModuleQuestion> {
  questionId: number;
}

export interface UpdateModuleQuestionResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ModuleMedia;
}
