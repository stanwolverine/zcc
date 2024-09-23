import { render } from '@testing-library/react-native';

import { CustomerListItem } from '../CustomerListItem';
import { ZellerCustomer } from '@/types';
import { useColorScheme } from 'react-native';

describe('CustomerListItem', () => {
  it('renders correctly', () => {
    // Arrange
    const customer: ZellerCustomer = {
      id: '1',
      email: 'test@test.com',
      name: 'Test',
      role: 'ADMIN',
    };
    jest.mocked(useColorScheme).mockReturnValueOnce('light');

    // Act
    const tree = render(<CustomerListItem data={customer} />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
