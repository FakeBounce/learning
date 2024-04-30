import { ApiRequestSort, ApiResponseMessage, ApiResponsePagination } from '@services/interfaces';
import { Role } from '@services/roles/interfaces';

export interface Group {
  id: number;
  name: string;
  description?: string;
  isMain?: boolean;
  nbUsers?: number;
  roles?: Role[];
}

export interface GroupFromAPI {
  id: number;
  name: string;
  description: string;
  organisation_id: number;
  is_main: boolean;
  nb_users: number;
}

export interface GetGroupsRequest {
  currentPage: number;
  rowsPerPage: number;
  sort?: ApiRequestSort;
  filters?: any;
}

export interface GetGroupsResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: {
    rows: GroupFromAPI[];
    pagination: ApiResponsePagination;
  };
}

export interface DeleteGroupRequest {
  groupId: number;
}

export interface DeleteGroupResponse {
  success: boolean;
  message: ApiResponseMessage;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  usersId?: number[];
}

export interface CreateGroupResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: Group;
}
