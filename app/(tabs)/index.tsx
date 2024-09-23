import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';
import { Divider } from '@/components/Divider';
import { USER_TYPES } from '@/constants/UserTypes';
import { CustomerList } from '@/components/home/CustomerList/CustomerList';
import { CustomerTypeSelection } from '@/components/home/CustomerTypeSelection';

export default function HomeScreen() {
  const [selectedUserType, setUserType] = useState(USER_TYPES[0]);

  return (
    <ThemedView style={styles.wrapper}>
      <SafeAreaView style={styles.contentContainer}>
        <CustomerTypeSelection selectedUserType={selectedUserType} onSelect={setUserType} />

        <Divider topSpace={20} bottomSpace={0} />

        <CustomerList userType={selectedUserType} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  contentContainer: { flex: 1, paddingHorizontal: 32 },
});
