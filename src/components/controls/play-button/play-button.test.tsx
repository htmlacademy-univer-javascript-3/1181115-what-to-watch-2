import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '../../../consts';
import { withHistory } from '../../../utils/mock-component';
import PlayButton from './play-button';
import { filmInfo } from '../../../utils/mock-data';

describe('Component: PlayButton', () => {
  const film = filmInfo();
  it('should render correct', () => {
    const preparedComponent = withHistory(<PlayButton filmId={film.id} />);

    render(preparedComponent);
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should rederect to page with film player when user click "Play"', async() => {
    const mockHistory: MemoryHistory = createMemoryHistory();
    const preparedComponent = withHistory(<PlayButton filmId={film.id} />, mockHistory);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));
    expect(mockHistory.location.pathname).toBe(AppRoutes.Player.replace(':id', film.id));
  });
});
