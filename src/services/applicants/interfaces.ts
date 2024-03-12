import { ApiResponseMessage, ApiResponsePagination } from '@services/interfaces';

export interface Applicant {
  id: number;
  profile_picture: string | null;
  email: string;
  type: ApplicantType.STUDENT | ApplicantType.TESTER;
  external_id: number | null;
  firstname: string;
  lastname: string;
  phone: string | null;
  is_active: boolean;
  other_data: string[];
  birth_name: null | string;
  birth_date: string;
  city: string;
  notifications: ApplicantNotifications;
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

export interface UpdateApplicantBlockRequest {
  setActive: boolean;
  applicantId: number;
}

export interface UpdateApplicantBlockResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Applicant;
}
