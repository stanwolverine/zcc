import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RadioInput } from '@/components/RadioInput';
import { USER_TYPES } from '@/constants/UserTypes';
import { UserType } from '@/types';

export type CustomerTypeSelectionProps = {
  selectedUserType: UserType;
  onSelect: (userType: UserType) => void;
};

export const CustomerTypeSelection: React.FC<CustomerTypeSelectionProps> = ({
  selectedUserType,
  onSelect,
}) => {
  return (
    <ThemedView>
      <ThemedText type="subtitle" style={styles.subtitle}>
        User Types
      </ThemedText>

      <ThemedView style={styles.radioInputGroup}>
        {USER_TYPES.map((userType) => {
          const isActive = userType.id === selectedUserType.id;
          return (
            <RadioInput
              key={userType.id}
              isActive={isActive}
              text={userType.label}
              onPress={() => onSelect(userType)}
            />
          );
        })}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  subtitle: { marginVertical: 28 },
  radioInputGroup: { gap: 4 },
});
