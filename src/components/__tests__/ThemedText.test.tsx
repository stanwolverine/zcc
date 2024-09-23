import { render, screen } from '@testing-library/react-native';
import { useColorScheme } from 'react-native';

import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';

describe('ThemedText', () => {
  it(`has light color in dark theme`, () => {
    // arrange
    const currentTheme = 'dark';
    const textColor = Colors[currentTheme].text;
    jest.mocked(useColorScheme).mockReturnValueOnce(currentTheme);

    // act
    render(<ThemedText>Test</ThemedText>);

    // assert
    const themedText = screen.getByText('Test');
    expect(themedText).toHaveStyle({ color: textColor });
  });

  it(`has dark color in light theme`, () => {
    // arrange
    const currentTheme = 'light';
    const textColor = Colors[currentTheme].text;
    jest.mocked(useColorScheme).mockReturnValueOnce(currentTheme);

    // act
    render(<ThemedText>Test</ThemedText>);

    // assert
    const themedText = screen.getByText('Test');
    expect(themedText).toHaveStyle({ color: textColor });
  });
});
