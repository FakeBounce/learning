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
  composition: string;
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

export enum ModuleCompositionItemType {
  SUBJECT = 'subject',
  QUESTION = 'question'
}

export interface ModuleCompositionItem {
  name: string;
  id: number;
  type: ModuleCompositionItemType;
  composition: ModuleCompositionItem[];
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
