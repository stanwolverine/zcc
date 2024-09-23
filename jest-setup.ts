/* eslint-env node */
import '@testing-library/react-native/extend-expect';

// Mocking React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  // Mocking `useColorScheme` hook from `react-native`
  Object.defineProperty(RN, 'useColorScheme', {
    configurable: true,
    value: jest.fn().mockReturnValue('light'),
  });

  return RN;
});

jest.mock('@apollo/client', () => {
  const AC = jest.requireActual('@apollo/client');

  const originalUseQuery = AC.useQuery;
  const mockedRefetch = jest.fn();

  AC.useQuery = jest.fn((...args: any[]) => {
    const result = originalUseQuery(...args);
    result.refetch = mockedRefetch;
    return result;
  });

  Object.defineProperty(AC.useQuery, 'mockedRefetch', {
    configurable: true,
    value: mockedRefetch,
  });

  return AC;
});
