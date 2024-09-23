import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export type CustomerListHeaderProps = {
  customerType: string;
};

export const CustomerListHeader: React.FC<CustomerListHeaderProps> = ({ customerType }) => {
  return (
    <ThemedView style={{ marginVertical: 28 }}>
      <ThemedText type="subtitle">{customerType} Users</ThemedText>
    </ThemedView>
  );
};
