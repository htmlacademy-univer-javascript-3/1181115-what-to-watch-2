import { generateFilmsArray } from '../../utils/mock-data';
import { addFilmToFavoriteAction, fetchFavoriteFilmsAction, removeFilmToFavoriteAction } from '../api-actions';
import { myListSlice } from './my-list-slice';

describe('MyListSlice slice', () => {
  const emptyAction = { type: '' };

  it('should return initial state with empty action', () => {
    const expectedState = {
      countFilmsInMyList: 5,
      filmsInMyList: generateFilmsArray(5),
      isLoading: false,
    };

    const result = myListSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefind state', () => {
    const expectedState = {
      countFilmsInMyList: 0,
      filmsInMyList: [],
      isLoading: false,
    };

    const result = myListSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "true" in state with "fetchFavoriteFilmsAction.pending" action', () => {
    const expectedState = {
      countFilmsInMyList: 0,
      filmsInMyList: [],
      isLoading: true,
    };

    const result = myListSlice.reducer(undefined, fetchFavoriteFilmsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "false", update "filmsInMyLis" and "countFilmsInMyList" in state with "fetchFavoriteFilmsAction.fulfilled" action', () => {
    const initialState = {
      countFilmsInMyList: 0,
      filmsInMyList: [],
      isLoading: true,
    };

    const films = generateFilmsArray(5);
    const countFilms = films.length;

    const expectedState = {
      countFilmsInMyList: countFilms,
      filmsInMyList: films,
      isLoading: false,
    };

    const result = myListSlice.reducer(initialState, fetchFavoriteFilmsAction.fulfilled(films, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should increase "countFilmsInMyList" by 1 and add film in "filmsInMyList" array in state with "addFilmToFavoriteAction.fulfilled" action', () => {
    const initialState = {
      countFilmsInMyList: 0,
      filmsInMyList: [],
      isLoading: false,
    };

    const film = generateFilmsArray(1)[0];

    const expectedState = {
      countFilmsInMyList: 1,
      filmsInMyList: [film],
      isLoading: false,
    };

    const result = myListSlice.reducer(initialState, addFilmToFavoriteAction.fulfilled(film, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should decrease "countFilmsInMyList" by 1 and remove film in "filmsInMyList" array in state with "removeFilmToFavoriteAction.fulfilled" action', () => {
    const films = generateFilmsArray(5);
    const countFilms = films.length;
    const film = films[0];

    const initialState = {
      countFilmsInMyList: countFilms,
      filmsInMyList: films,
      isLoading: false,
    };

    const expectedState = {
      countFilmsInMyList: countFilms - 1,
      filmsInMyList: films.filter((filmInArr) => filmInArr.id !== film.id),
      isLoading: false,
    };

    const result = myListSlice.reducer(initialState, removeFilmToFavoriteAction.fulfilled(film, '', ''));
    expect(result).toEqual(expectedState);
  });
});
