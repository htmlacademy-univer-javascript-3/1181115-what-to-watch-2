import { generateFilmsArray, promoFilmInfo } from '../../utils/mock-data';
import { fetchFilmsAction, fetchPromoAction } from '../api-actions';
import { filmsSlice, setActiveGenre } from './films-slice';

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
      genre: '',
      films: generateFilmsArray(25),
      isLoading: false,
      promoFilm: promoFilmInfo(),
    };

    const result = filmsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefind state', () => {
    const expectedState = {
      genre:'',
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const result = filmsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should update "genre" in state with "setActiveGenre" action', () => {
    const initialState = {
      genre: '',
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const expectedState = {
      genre: 'Drama',
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const result = filmsSlice.reducer(initialState, setActiveGenre('Drama'));
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "true" in state with "fetchFilmsAction.pending" action', () => {
    const expectedState = {
      genre: '',
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
      genre: '',
      films: films,
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const result = filmsSlice.reducer(undefined, fetchFilmsAction.fulfilled(films, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should update "promoFilm" in state with "fetchPromoAction.fulfilled" action', () => {
    const initialState = {
      genre: '',
      films: [],
      isLoading: false,
      promoFilm: initialPromoFilm,
    };

    const promoFilm = promoFilmInfo();

    const expectedState = {
      genre: '',
      films: [],
      isLoading: false,
      promoFilm: promoFilm,
    };

    const result = filmsSlice.reducer(initialState, fetchPromoAction.fulfilled(promoFilm, '', undefined));
    expect(result).toEqual(expectedState);
  });
});
