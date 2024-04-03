import { ApiResponseMessage, ApiResponsePagination } from '@services/interfaces';

export interface ApplicantState {
  applicantList: ApplicantListState;
  applicantProfile: ApplicantProfileState;
  applicantUpdate: ApplicantUpdateState;
  applicantCreate: ApplicantCreateState;
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

export interface ApplicantUpdateState {
  applicantUpdateLoading: boolean;
  isEditing: boolean;
}

export interface ApplicantCreateState {
  applicantCreateLoading: boolean;
  hasCreated: boolean;
}

interface BaseApplicant {
  id: number;
  profilePicture: string | undefined;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  externalId: string | null;
  firstname: string;
  lastname: string;
  phone: string | null;
  isActive: boolean;
  birthName?: null | string;
  birthDate?: string;
  city?: string | null;
  notifications?: ApplicantNotifications;
  groups?: string[];
}
interface AdditionalApplicantProperties {
  [key: string]: string | number | null | boolean | undefined;
}

export type Applicant = BaseApplicant & AdditionalApplicantProperties;

interface BaseApplicantFromApi {
  id: number;
  profile_picture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  external_id: string | null;
  firstname: string;
  lastname: string;
  phone: string | null;
  is_active: boolean;
  birth_name: null | string;
  birth_date: string;
  city: string | null;
  notifications?: ApplicantNotifications;
}
export type ApplicantFromApi = BaseApplicantFromApi & AdditionalApplicantProperties;

export interface SingleApplicantFromApi {
  id: number;
  profile_picture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  external_id: string | null;
  is_active: boolean;
  notifications?: ApplicantNotifications;
  current_values: ApplicantValues;
}

export interface BaseApplicantValues {
  firstname: string;
  lastname: string;
  phone: string | null;
  birth_name: null | string;
  birth_date: string;
  city: string;
}
export type ApplicantValues = BaseApplicantValues & AdditionalApplicantProperties;

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
  type: ApplicantType;
  sort?: { field: string; direction: 'ASC' | 'DESC' };
  filters?: any;
}

export interface GetApplicantsListResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: ApplicantFromApi[];
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
  data: ApplicantFromApi;
}

export interface UpdateApplicantRequest {
  applicantId: number;
  applicant: Partial<Applicant>;
  profilePicture?: string | File | undefined;
}

export interface UpdateApplicantResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ApplicantFromApi;
}

export interface CreateApplicantRequest {
  applicant: Omit<BaseApplicant, 'profilePicture' | 'id' | 'isActive'>;
  profilePicture?: string | File | undefined;
}

export interface CreateApplicantResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: ApplicantFromApi;
}
