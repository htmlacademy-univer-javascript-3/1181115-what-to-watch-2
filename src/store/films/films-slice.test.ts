import { GenresEnum } from '../../consts';
import { generateFilmsArray, promoFilmInfo } from '../../utils/mock-data';
import { fetchFilmsAction, fetchPromoFilmAction } from '../api-actions';
import { filmsSlice, updateGenre } from './films-slice';

describe('FilmsSlice slice', () => {
  const emptyAction = { type: '' };
  const initialPromoFilm = {
    id: '',
    name: '',
    posterImage: '',
    backgroundImage: '',
    videoLink: '',
    genre: '',
    released: 0,
    isFavorite: false
  };

  it('should return initial state with empty action', () => {
    const expectedState = {
      genre: GenresEnum.AllGenres,
      films: generateFilmsArray(25),
      isLoading: false,
      promoFilm: promoFilmInfo(),
    };

    const result = filmsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefind state', () => {
    const expectedState = {
      genre: GenresEnum.AllGenres,
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const result = filmsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should update "genre" in state with "updateGenre" action', () => {
    const initialState = {
      genre: GenresEnum.AllGenres,
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const expectedState = {
      genre: GenresEnum.Drama,
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const result = filmsSlice.reducer(initialState, updateGenre(GenresEnum.Drama));
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "true" in state with "fetchFilmsAction.pending" action', () => {
    const expectedState = {
      genre: GenresEnum.AllGenres,
      films: [],
      isLoading: true,
      promoFilm: initialPromoFilm,
    };

    const result = filmsSlice.reducer(undefined, fetchFilmsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "false" and update "films" array in state with "fetchFilmsAction.fulfilled" action', () => {
    const films = generateFilmsArray(25);

    const expectedState = {
      genre: GenresEnum.AllGenres,
      films: films,
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const result = filmsSlice.reducer(undefined, fetchFilmsAction.fulfilled(films, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should update "promoFilm" in state with "fetchPromoFilmAction.fulfilled" action', () => {
    const initialState = {
      genre: GenresEnum.AllGenres,
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const promoFilm = promoFilmInfo();

    const expectedState = {
      genre: GenresEnum.AllGenres,
      films: [],
      isLoading: false,
      promoFilm: promoFilm,
    };

    const result = filmsSlice.reducer(initialState, fetchPromoFilmAction.fulfilled(promoFilm, '', undefined));
    expect(result).toEqual(expectedState);
  });
});
