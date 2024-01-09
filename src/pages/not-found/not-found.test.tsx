import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { withHistory } from '../../utils/mock-component';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoutes } from '../../consts';
import userEvent from '@testing-library/user-event';

describe('Component: NotFound', () => {
  it('should render correctly and display redirect link', () => {
    const errorCode = '404';
    const message = 'Ooops...';

    const preparedComponent = withHistory(<NotFound />);

    render(preparedComponent);

    expect(screen.getByText(errorCode)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should redirect to main page when user click to link', async() => {
    const mockHistory: MemoryHistory = createMemoryHistory();
    const preparedComponent = withHistory(<NotFound />, mockHistory);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('not-found-btn'));
    expect(mockHistory.location.pathname).toBe(AppRoutes.Main);
  });
});

