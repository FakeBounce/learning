import { Group } from '@services/groups/interfaces.ts';
import { User } from '@services/connected-user/interfaces.ts';

export interface Role {
  id: number;
  name: string;
  description: string;
  users: User[];
  groups: Group[];
  permissions: [];
}