import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { CustomerList } from '../CustomerList';
import { USER_TYPES } from '@/constants/UserTypes';
import { Variables, ZellerCustomerData } from '@/types';
import { ZELLER_CUSTOMERS_LIST_QUERY } from '../CustomerList.gql';
import { useQuery } from '@apollo/client';

describe('Customer List', () => {
  it('shows a loading indicator initially', () => {
    // Arrange
    const initalUserType = USER_TYPES[0];
    const mocks: MockedResponse<ZellerCustomerData, Variables>[] = [
      {
        request: {
          query: ZELLER_CUSTOMERS_LIST_QUERY,
          variables: { filter: { role: { eq: initalUserType.value } }, limit: 20, nextToken: null },
        },
        result: {
          data: {
            listZellerCustomers: {
              items: [],
              nextToken: '',
            },
          },
        },
      },
    ];

    // Act
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomerList userType={initalUserType} />
      </MockedProvider>
    );

    // Assert
    expect(screen.getByLabelText('loading')).toBeTruthy();
  });

  it('shows a message that no result found, when list is empty', async () => {
    // Arrange
    const initalUserType = USER_TYPES[0];
    const mocks: MockedResponse<ZellerCustomerData, Variables>[] = [
      {
        request: {
          query: ZELLER_CUSTOMERS_LIST_QUERY,
          variables: { filter: { role: { eq: initalUserType.value } }, limit: 20, nextToken: null },
        },
        result: {
          data: {
            listZellerCustomers: {
              items: [],
              nextToken: '',
            },
          },
        },
      },
    ];

    // Act
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomerList userType={initalUserType} />
      </MockedProvider>
    );

    // Assert
    await waitForElementToBeRemoved(() => screen.queryByLabelText('loading'));

    expect(screen.getByText(/no results found/i)).toBeTruthy();
  });

  it('shows a list of users', async () => {
    // Arrange
    const initalUserType = USER_TYPES[0];
    const mocks: MockedResponse<ZellerCustomerData, Variables>[] = [
      {
        request: {
          query: ZELLER_CUSTOMERS_LIST_QUERY,
          variables: { filter: { role: { eq: initalUserType.value } }, limit: 20, nextToken: null },
        },
        result: {
          data: {
            listZellerCustomers: {
              items: [
                { email: 'test1@test.com', id: '1', name: 'Test 1', role: initalUserType.value },
                { email: 'test2@test.com', id: '2', name: 'Test 2', role: initalUserType.value },
                { email: 'test3@test.com', id: '3', name: 'Test 3', role: initalUserType.value },
              ],
              nextToken: '',
            },
          },
        },
      },
    ];

    // Act
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomerList userType={initalUserType} />
      </MockedProvider>
    );

    // Assert
    await waitForElementToBeRemoved(() => screen.queryByLabelText('loading'));
    expect(screen.getByText('Test 1')).toBeTruthy();
    expect(screen.getByText('Test 2')).toBeTruthy();
    expect(screen.getByText('Test 3')).toBeTruthy();
  });

  it('should call `refetch` function of `useQuery` hook on pull to refetch', async () => {
    // Arrange
    const initalUserType = USER_TYPES[0];
    const mocks: MockedResponse<ZellerCustomerData, Variables>[] = [
      {
        delay: 30, // to prevent React from batching the loading state away
        // delay: Infinity // if you only want to test the loading state
        request: {
          query: ZELLER_CUSTOMERS_LIST_QUERY,
          variables: { filter: { role: { eq: initalUserType.value } }, limit: 20, nextToken: null },
        },
        result: {
          data: {
            listZellerCustomers: {
              items: [
                { email: 'test1@test.com', id: '1', name: 'Test 1', role: initalUserType.value },
                { email: 'test2@test.com', id: '2', name: 'Test 2', role: initalUserType.value },
                { email: 'test3@test.com', id: '3', name: 'Test 3', role: initalUserType.value },
              ],
              nextToken: '',
            },
          },
        },
        maxUsageCount: 2, // The mock can be used twice before it's removed, default is 1
      },
    ];

    // Act
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomerList userType={initalUserType} />
      </MockedProvider>
    );

    // Assert
    await waitForElementToBeRemoved(() => screen.queryByLabelText('loading'));
    const listElement = screen.getByTestId('customers-list');

    const { refreshControl } = listElement.props;
    await act(() => refreshControl.props.onRefresh());

    expect(useQuery.mockedRefetch).toHaveBeenCalledTimes(1);
  });
});
