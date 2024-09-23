import { act, render, screen, userEvent, within } from '@testing-library/react-native';

import { USER_TYPES } from '@/constants/UserTypes';
import { Colors } from '@/constants/Colors';
import { CustomerTypeSelection } from '../CustomerTypeSelection';

describe('CustomerTypeSelection', () => {
  it('displays the option as selected based on passed `selectedUserType` prop', () => {
    // Arrange
    const defaultSelectedUserType = USER_TYPES[0];
    const activeBgColor = Colors.light.secondary;

    // Act
    render(
      <CustomerTypeSelection onSelect={jest.fn()} selectedUserType={defaultSelectedUserType} />
    );

    // Assert
    /// Asserting if passed option is selected
    const selectedElement = screen.getByTestId(`radio-input-${USER_TYPES[0].label}`);
    expect(selectedElement).toHaveStyle({ backgroundColor: activeBgColor });

    /// Asserting if selected option has correct label
    const selectedTextElement = within(selectedElement).getByText(USER_TYPES[0].label);
    expect(selectedTextElement).toHaveProp('children', defaultSelectedUserType.label);

    /// Asserting if other option is not shown as selected
    const anotherElement = screen.getByTestId(`radio-input-${USER_TYPES[1].label}`);
    expect(anotherElement).toHaveStyle({ backgroundColor: undefined });
  });

  it('should call `onSelect` prop with pressed customer user type data', async () => {
    // Arrange
    const defaultSelectedUserType = USER_TYPES[0];
    const toSelectUserType = USER_TYPES[1];
    const onSelectMock = jest.fn();
    const user = userEvent.setup();

    // Act
    render(
      <CustomerTypeSelection onSelect={onSelectMock} selectedUserType={defaultSelectedUserType} />
    );

    await act(
      async () => await user.press(screen.getByTestId(`radio-input-${toSelectUserType.label}`))
    );

    // Assert
    expect(onSelectMock).toHaveBeenCalledWith({ ...toSelectUserType });
  });
});
