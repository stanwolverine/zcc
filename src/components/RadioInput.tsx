import { StyleSheet, TouchableOpacity, TouchableOpacityProps, useColorScheme } from 'react-native';
import React from 'react';

import { RadioIcon } from '@/components/RadioIcon';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export type RadioInputProps = TouchableOpacityProps & {
  isActive: boolean;
  text: string;
};

export const RadioInput: React.FC<RadioInputProps> = ({
  disabled,
  isActive,
  text,
  style,
  ...restProps
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      testID={`radio-input-${text}`}
      disabled={disabled ?? isActive}
      style={[
        styles.input,
        {
          backgroundColor: isActive ? Colors[colorScheme ?? 'light'].secondary : undefined,
        },
        style,
      ]}
      {...restProps}>
      <RadioIcon isActive={isActive} />

      <ThemedText type="default">{text}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 12,
    alignItems: 'center',
  },
});
