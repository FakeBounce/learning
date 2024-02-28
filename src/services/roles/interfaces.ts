import { Group } from '@services/groups/interfaces';
import { User } from '@services/connected-user/interfaces';

export interface Role {
  id: number;
  name: string;
  description: string;
  users: User[];
  groups: Group[];
  permissions: [];
}