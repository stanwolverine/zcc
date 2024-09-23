import type { USER_TYPES } from '@/constants/UserTypes';

export type TableZellerCustomerFilterInput = Partial<{
  id: TableStringFilterInput | null;
  name: TableStringFilterInput | null;
  email: TableStringFilterInput | null;
  role: TableStringFilterInput | null;
}>;

export type TableStringFilterInput = Partial<{
  ne: string | null;
  eq: string | null;
  le: string | null;
  lt: string | null;
  ge: string | null;
  gt: string | null;
  contains: string | null;
  notContains: string | null;
  between: [string] | null;
  beginsWith: string | null;
}>;

export interface Variables {
  filter: TableZellerCustomerFilterInput | null;
  limit: number | null;
  nextToken: string | null;
}

export type ZellerCustomer = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
};

export type ZellerCustomerConnection = {
  items: ZellerCustomer[];
  nextToken: string;
};

export type ZellerCustomerData = {
  listZellerCustomers: ZellerCustomerConnection;
};

export type UserType = (typeof USER_TYPES)[number];
