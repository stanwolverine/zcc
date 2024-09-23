import { gql, TypedDocumentNode } from '@apollo/client';

import { Variables, ZellerCustomerData } from '@/types';

export const ZELLER_CUSTOMERS_LIST_QUERY: TypedDocumentNode<ZellerCustomerData, Variables> = gql`
  query GetZellerCustomersList(
    $filter: TableZellerCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        role
      }
      nextToken
    }
  }
`;
