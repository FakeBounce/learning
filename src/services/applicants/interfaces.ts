import { ApiResponseMessage, ApiResponsePagination } from '@services/interfaces';

export interface ApplicantState {
  applicantList: ApplicantListState;
  applicantProfile: ApplicantProfileState;
}

export interface ApplicantProfileState {
  applicantProfileData: Applicant | null;
  applicantProfileLoading: boolean;
}

export interface ApplicantListState {
  applicantListData: Applicant[];
  applicantListLoading: boolean;
  applicantListTotalCount: number | null;
}

export interface Applicant {
  id: number;
  profilePicture: string | undefined;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  externalId: number | null;
  firstname: string;
  lastname: string;
  phone: string | null;
  isActive: boolean;
  birthName: null | string;
  birthDate: string;
  city: string;
  notifications: ApplicantNotifications;
  [key: string]: string | number | null | boolean | ApplicantNotifications | undefined;
}

export interface ApplicantFromApi {
  id: number;
  profile_picture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  external_id: number | null;
  firstname: string;
  lastname: string;
  phone: string | null;
  is_active: boolean;
  birth_name: null | string;
  birth_date: string;
  city: string;
  notifications: ApplicantNotifications;
  [key: string]: string | number | null | boolean | ApplicantNotifications;
}

export interface SingleApplicantFromApi {
  id: number;
  profile_picture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  external_id: number | null;
  is_active: boolean;
  notifications: ApplicantNotifications;
  current_values: ApplicantValues;
}

export interface ApplicantValues {
  firstname: string;
  lastname: string;
  phone: string | null;
  birth_name: null | string;
  birth_date: string;
  city: string;
  [key: string]: string | number | null | boolean;
}

export interface ApplicantNotifications {
  app: '0' | '1';
  sms: '0' | '1';
  email: '0' | '1';
}

export enum ApplicantType {
  STUDENT = 'student',
  TESTER = 'tester'
}

export interface GetApplicantsListRequest {
  currentPage: number;
  rowsPerPage: number;
  sort?: { field: string; direction: 'ASC' | 'DESC' };
  filters?: any;
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
  data: SingleApplicantFromApi;
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
