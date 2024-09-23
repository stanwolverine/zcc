import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView, ThemedViewProps } from '@/components/ThemedView';

export type DividerProps = ThemedViewProps & {
  topSpace?: number;
  bottomSpace?: number;
  verticalSpace?: number;
};

export const Divider: React.FC<DividerProps> = ({ topSpace, bottomSpace, verticalSpace = 28 }) => {
  return (
    <ThemedView
      lightColor="#555555"
      darkColor="#3f3f3f"
      style={{
        height: StyleSheet.hairlineWidth,
        width: '100%',
        marginVertical: verticalSpace,
        marginTop: topSpace,
        marginBottom: bottomSpace,
      }}
    />
  );
};
