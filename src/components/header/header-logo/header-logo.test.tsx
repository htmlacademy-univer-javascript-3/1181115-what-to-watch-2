import { render, screen } from '@testing-library/react';
import HeaderLogo from './header-logo';
import { withHistory } from '../../../utils/mock-component';
import userEvent from '@testing-library/user-event';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoutes } from '../../../consts';

describe('Component: HeaderLogo', () => {
  it('should render correctly and display redirect link', async() => {
    const preparedComponent = withHistory(<HeaderLogo linkLogo='/'/>);
    render(preparedComponent);

    expect(screen.getByTestId('logo')).toBeInTheDocument();

    const link = screen.getByRole('link', {name: /w t w/i});
    expect(link).toBeInTheDocument();

    const mockHistory: MemoryHistory = createMemoryHistory();
    await userEvent.click(link);
    expect(mockHistory.location.pathname).toBe(AppRoutes.Main);
  });
});

