import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, { useCallback } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';

import { CustomerListFooter } from '@/components/home/CustomerListFooter';
import { ThemedView } from '@/components/ThemedView';
import { UserType, ZellerCustomer } from '@/types';
import { Colors } from '@/constants/Colors';
import { ZELLER_CUSTOMERS_LIST_QUERY } from '@/components/home/CustomerList/CustomerList.gql';
import { CustomerListHeader } from '@/components/home/CustomerListHeader';
import { CustomerListItem } from '@/components/home/CustomerListItem';
import { ThemedText } from '@/components/ThemedText';

export type CustomerListProps = {
  userType: UserType;
};

export const CustomerList: React.FC<CustomerListProps> = ({ userType }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const { data, error, refetch, networkStatus, fetchMore, called } = useQuery(
    ZELLER_CUSTOMERS_LIST_QUERY,
    {
      variables: {
        filter: {
          role: {
            eq: userType.value,
          },
        },
        limit: 20,
        nextToken: null,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) console.log(error);

  const _renderItem: ListRenderItem<ZellerCustomer> = useCallback(({ item }) => {
    return <CustomerListItem data={item} />;
  }, []);

  const _keyExtractor = useCallback((item: ZellerCustomer, _index: number) => item.id, []);

  const itemSeparatorComponent = useCallback(() => <ThemedView style={styles.itemSeparator} />, []);

  const nextToken = data?.listZellerCustomers.nextToken;

  const canFetchMore = !!(nextToken && called && networkStatus !== NetworkStatus.fetchMore);

  const endReachedHandler = useCallback(() => {
    if (canFetchMore) {
      fetchMore({
        variables: {
          nextToken: nextToken,
        },
      });
    }
  }, [canFetchMore, nextToken, fetchMore]);

  return (
    <FlatList
      testID="customers-list"
      data={data?.listZellerCustomers.items}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      refreshControl={
        <RefreshControl
          testID="refreshing"
          refreshing={networkStatus === NetworkStatus.refetch}
          colors={[Colors[colorScheme].onSecondary]}
          tintColor={Colors[colorScheme].onSecondary}
          onRefresh={() => refetch()}
        />
      }
      onEndReached={canFetchMore ? endReachedHandler : null}
      ListEmptyComponent={
        networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.setVariables ? (
          <ActivityIndicator
            accessibilityLabel="loading"
            color={Colors[colorScheme].onSecondary}
            size={'small'}
          />
        ) : (
          <ThemedText>Sorry, no results found.</ThemedText>
        )
      }
      ListHeaderComponent={<CustomerListHeader customerType={userType.label} />}
      ListFooterComponent={
        <CustomerListFooter fetchingMore={networkStatus === NetworkStatus.fetchMore} />
      }
      ItemSeparatorComponent={itemSeparatorComponent}
    />
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    height: 28,
    width: '100%',
  },
});
