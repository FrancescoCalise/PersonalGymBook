import { BaseDocument } from './models';

export interface Role extends BaseDocument {
  type: RoleType;
}

export enum RoleType {
  User = 'user',
  Coach = 'coach',
  Admin = 'admin'
}