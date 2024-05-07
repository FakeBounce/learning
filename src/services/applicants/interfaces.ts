import {
  ApiResponseMessage,
  ApiResponsePagination,
  TableRequestConfig
} from '@services/interfaces';
import { Group } from '@services/groups/interfaces';

export interface ApplicantState {
  applicantList: ApplicantListState;
  applicantProfile: ApplicantProfileState;
  applicantUpdate: ApplicantUpdateState;
  applicantCreate: ApplicantCreateState;
  applicantBulk: ApplicantBulkState;
}

export interface ApplicantProfileState {
  applicantProfileData: Applicant | null;
  applicantProfileLoading: boolean;
}

export interface ApplicantListState {
  applicantListData: Applicant[];
  applicantListLoading: boolean;
  applicantListTotalCount: number;
}

export interface ApplicantUpdateState {
  applicantUpdateLoading: boolean;
  isEditing: boolean;
}

export interface ApplicantCreateState {
  applicantCreateLoading: boolean;
}
export interface ApplicantBulkState {
  applicantBulkLoading: boolean;
}

export interface Applicant {
  id: number;
  profilePicture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  externalId: string | null;
  firstname: string;
  lastname: string;
  phone: string | null;
  isActive: boolean;
  birthName?: null | string;
  birthDate?: string | Date;
  city?: string | null;
  notifications?: ApplicantNotifications;
  groups?: Group[];
  conflicts: ApplicantsUpdateConflicts;
  otherData: string | number | null | boolean | undefined[];
}

export interface ApplicantsUpdateConflicts {
  lastname?: string;
  firstname?: string;
  email?: string;
  birthDate?: string;
  externalId?: string;
  phone?: string;
  birthName?: string;
  city?: string;
  notifications?: ApplicantNotifications;
}

export interface ApplicantForBulk {
  externalId: string | null;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  birthDate?: string | null;
  birthName?: string | null;
  phone?: string | null;
  city?: string | null;
}

export interface ApplicantNotifications {
  app: boolean;
  sms: boolean;
  email: boolean;
}

export enum ApplicantType {
  STUDENT = 'student',
  TESTER = 'tester'
}

export interface GetApplicantsListRequest extends TableRequestConfig {
  type: ApplicantType;
}

export interface GetApplicantsListResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: Applicant[];
    pagination: ApiResponsePagination;
  };
}

export interface GetSingleApplicantResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Applicant;
}

export interface UpdateApplicantBlockRequest {
  setActive: boolean;
  applicantId: number;
}

export interface UpdateApplicantBlockResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Applicant;
}

export interface UpdateApplicantRequest {
  applicantId: number;
  applicant: {
    lastname: string;
    firstname: string;
    email: string;
    type: ApplicantType;
    birthDate?: string | Date;
    phone?: string;
    externalId?: string;
    birthName?: string;
    city?: string;
    groupsId?: string[];
    notifications?: {
      email: boolean;
      sms: boolean;
      app: boolean;
    };
  };
  profilePicture?: string | File | undefined;
}

export interface UpdateApplicantResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Applicant;
}

export interface UpdateApplicantPictureRequest {
  applicantId: number;
  profilePicture: File;
}

export interface UpdateApplicantPictureResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Applicant;
}

export interface CreateApplicantRequest {
  applicant: {
    lastname: string;
    firstname: string;
    email: string;
    type: ApplicantType;
    birthDate?: string | Date;
    phone?: string;
    externalId?: string;
    birthName?: string;
    city?: string;
    groupsId: string[];
    notifications?: {
      email: boolean;
      sms: boolean;
      app: boolean;
    };
  };
  profilePicture?: string | File | undefined;
}

export interface CreateApplicantResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Applicant;
}

export interface CreateBulkApplicantRequest {
  applicantList: ApplicantForBulk[];
  type: ApplicantType;
}

export interface CreateBulkApplicantResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: { rows: Applicant[] };
}
