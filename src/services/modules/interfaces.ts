import { ApiResponseMessage } from '@services/interfaces';
import { GroupFromAPI } from '@services/groups/interfaces';

export interface ModuleState {
  moduleCreate: {
    moduleCreateLoading: boolean;
  };
}
export const initialModuleState: ModuleState = {
  moduleCreate: {
    moduleCreateLoading: false
  }
};

export interface Module {
  id: number;
  title: string;
  description: string;
  media: string;
  timer: string;
  nbAttempts: number;
  successRate: number;
  displayAnswers: ModuleDisplayAnswers;
  isLocked: boolean;
  isPublic: boolean;
  languageId: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  organisationId: number;
  organisation: GroupFromAPI;
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

export enum ModuleDisplayAnswers {
  AFTER_QUESTION = 'after_question',
  END = 'end'
}
