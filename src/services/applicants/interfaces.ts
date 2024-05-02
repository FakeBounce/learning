import {
  ApiResponseMessage,
  ApiResponsePagination,
  TableRequestConfig
} from '@services/interfaces';

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

interface BaseApplicant {
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
  birthDate?: string;
  city?: string | null;
  notifications?: ApplicantNotifications;
  groups?: string[];
  conflicts?: ApplicantsUpdateConflicts;
}
interface AdditionalApplicantProperties {
  [key: string]: string | number | null | boolean | undefined;
}

export type Applicant = BaseApplicant & AdditionalApplicantProperties;

export interface ApplicantsUpdateConflicts {
  //@todo add groups
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

interface BaseApplicantFromApi {
  id: number;
  profilePicture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  externalId: string | null;
  firstname: string;
  lastname: string;
  phone: string | null;
  isActive: boolean;
  birthName: null | string;
  birthDate: string;
  city: string | null;
  notifications?: ApplicantNotifications;
}
export type ApplicantFromApi = BaseApplicantFromApi & AdditionalApplicantProperties;

export interface SingleApplicantFromApi {
  id: number;
  profilePicture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  externalId: string | null;
  isActive: boolean;
  notifications?: ApplicantNotifications;
  currentValues: ApplicantValues;
}

export interface BaseApplicantValues {
  firstname: string;
  lastname: string;
  phone: string | null;
  birthName: null | string;
  birthDate: string;
  city: string;
}
export type ApplicantValues = BaseApplicantValues & AdditionalApplicantProperties;

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

export interface UpdateApplicantPictureRequest {
  applicantId: number;
  profilePicture: File;
}

export interface UpdateApplicantPictureResponse {
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

export interface CreateBulkApplicantRequest {
  applicantList: ApplicantForBulk[];
  type: ApplicantType;
}

export interface CreateBulkApplicantResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: { rows: ApplicantFromApi[] };
}
