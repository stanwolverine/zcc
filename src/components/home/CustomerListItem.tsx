import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ZellerCustomer } from '@/types';
import { Colors } from '@/constants/Colors';

export type CustomerListItemProps = {
  data: ZellerCustomer;
};

const _CustomerListItem: React.FC<CustomerListItemProps> = ({ data }) => {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView testID={`customer-item-${data.id}`} style={styles.container}>
      {/** Avatar */}
      <ThemedView
        testID={`customer-avatar-${data.id}`}
        style={[
          styles.avatar,
          {
            backgroundColor: Colors[colorScheme].secondary,
          },
        ]}>
        <ThemedText
          type="small"
          style={[styles.avatarText, { color: Colors[colorScheme].onSecondary }]}>
          {data.name?.charAt(0)}
        </ThemedText>
      </ThemedView>

      {/** Info */}
      <ThemedView>
        <ThemedText testID={`customer-name-${data.name}`} type="default">
          {data.name}
        </ThemedText>

        <ThemedText
          testID={`customer-role-${data.role}`}
          type="small"
          lightColor="gray"
          darkColor="gray"
          style={styles.role}>
          {data.role}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export const CustomerListItem = React.memo(_CustomerListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    minWidth: 45,
    borderRadius: 4,
    aspectRatio: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { textTransform: 'uppercase' },
  role: { textTransform: 'capitalize' },
});
