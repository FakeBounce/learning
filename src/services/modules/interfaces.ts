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
  OWNER = 'owner'
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
  tags: string[];
  timer: string;
  title: string;
  updatedAt: Date;
  version: number;
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
