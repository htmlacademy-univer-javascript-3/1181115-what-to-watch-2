import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory } from '../../utils/mock-component.tsx';
import FilmCard from './film-card.tsx';
import { filmInfo } from '../../utils/mock-data.ts';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoutes } from '../../consts.ts';

describe('Component: FilmCard', () => {
  const film = filmInfo();

  it('should display video on hover and image by default', async () => {
    const handleFilmCardMouseEvent = vi.fn();

    const preparedComponent = withHistory(
      <FilmCard
        id={film.id}
        previewImage={film.posterImage}
        name={film.name}
        previewVideoLink={film.videoLink}
        genre={film.genre}
        active
        onFilmCardMouseEvent={handleFilmCardMouseEvent}
      />
    );

    render(preparedComponent);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    await userEvent.hover(article);
    expect(await screen.findByTestId('video')).toBeInTheDocument();
  });

  it('should display image by default', async () => {
    const handleFilmCardMouseEvent = vi.fn();

    const preparedComponent = withHistory(
      <FilmCard
        id={film.id}
        previewImage={film.posterImage}
        name={film.name}
        previewVideoLink={film.videoLink}
        genre={film.genre}
        active={false}
        onFilmCardMouseEvent={handleFilmCardMouseEvent}
      />
    );

    render(preparedComponent);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    await userEvent.unhover(article);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should rederect to "film" when user click to filmCard', async () => {
    const mockHistory: MemoryHistory = createMemoryHistory();
    const handleFilmCardMouseEvent = vi.fn();

    const preparedComponent = withHistory(
      <FilmCard
        id={film.id}
        previewImage={film.posterImage}
        name={film.name}
        previewVideoLink={film.videoLink}
        genre={film.genre}
        active={false}
        onFilmCardMouseEvent={handleFilmCardMouseEvent}
      />,
      mockHistory
    );

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('film-card'));
    expect(mockHistory.location.pathname).toBe(
      AppRoutes.Film.replace(':id', film.id)
    );
  });
});
