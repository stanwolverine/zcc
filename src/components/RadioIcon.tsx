import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export type RadioIconProps = {
  isActive: boolean;
  size?: number;
};

export const RadioIcon: React.FC<RadioIconProps> = ({ isActive, size = 24 }) => {
  const colorScheme = useColorScheme();

  return (
    <Ionicons
      size={size}
      color={
        isActive
          ? Colors[colorScheme ?? 'light'].onSecondary
          : Colors[colorScheme ?? 'light'].secondary
      }
      name={isActive ? 'radio-button-on-outline' : 'radio-button-off-outline'}
    />
  );
};
