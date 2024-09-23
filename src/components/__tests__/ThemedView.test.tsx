import { render, screen } from '@testing-library/react-native';
import { useColorScheme } from 'react-native';

import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';

describe('ThemedView', () => {
  it(`has correct background color in dark theme`, () => {
    // arrange
    const currentTheme = 'dark';
    const bgColor = Colors[currentTheme].background;
    jest.mocked(useColorScheme).mockReturnValueOnce(currentTheme);

    // act
    render(<ThemedView testID="themed-view" />);

    // assert
    const element = screen.getByTestId('themed-view');
    expect(element).toHaveStyle({ backgroundColor: bgColor });
  });

  it(`has correct background color in light theme`, () => {
    // arrange
    const currentTheme = 'light';
    const bgColor = Colors[currentTheme].background;
    jest.mocked(useColorScheme).mockReturnValueOnce(currentTheme);

    // act
    render(<ThemedView testID="themed-view" />);

    // assert
    const element = screen.getByTestId('themed-view');
    expect(element).toHaveStyle({ backgroundColor: bgColor });
  });
});
