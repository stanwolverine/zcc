import React from 'react';

import { Divider } from '@/components/Divider';
import { ThemedView } from '../ThemedView';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export type CustomerListFooterProps = {
  fetchingMore: boolean;
};

export const CustomerListFooter: React.FC<CustomerListFooterProps> = ({ fetchingMore }) => {
  const colorScheme = useColorScheme() ?? 'light';

  if (fetchingMore) {
    return (
      <ThemedView>
        <ActivityIndicator
          accessibilityLabel="loading more"
          size={'small'}
          color={Colors[colorScheme].onSecondary}
          style={{ marginTop: 32 }}
        />
        <Divider />
      </ThemedView>
    );
  }

  return <Divider />;
};
