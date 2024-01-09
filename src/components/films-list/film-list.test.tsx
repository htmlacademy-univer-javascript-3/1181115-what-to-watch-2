import { render, screen } from '@testing-library/react';
import MemoFilmsList from './films-list';
import { generateFilmsArray } from '../../utils/mock-data';
import { withHistory } from '../../utils/mock-component';

describe('Component: FilmList', () => {
  const films = generateFilmsArray(25);

  it('should display film cards', () => {
    const preparedComponent = withHistory(<MemoFilmsList list={films}/>);
    render(preparedComponent);

    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(films.length);
  });
});
