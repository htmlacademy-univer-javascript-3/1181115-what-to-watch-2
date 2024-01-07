import { filmInfo, generateFilmReviewArr, generateFilmsArray } from '../../utils/mock-data';
import { filmSlice } from './film-slice';
import { fetchComentsAction, fetchFilmAction, fetchSimilarFilmsAction, sendCommentAction } from '../api-actions';

describe('FilmSlice slice', () => {
  const emptyAction = { type: '' };
  const initialFilm = {
    id: '',
    name: '',
    posterImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  };

  it('should return initial state with empty action', () => {
    const expectedState = {
      film: filmInfo(),
      comments: generateFilmReviewArr(5),
      similarFilms: generateFilmsArray(4),
      isLoading: false,
      error: undefined,
    };

    const result = filmSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefind state', () => {
    const expectedState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: undefined,
    };

    const result = filmSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should update "film" and "error" to "undefind" in state with "fetchFilmAction.fulfilled" action', () => {
    const film = filmInfo();

    const initialState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: 'error',
    };

    const expectedState = {
      film: film,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: undefined,
    };

    const result = filmSlice.reducer(initialState, fetchFilmAction.fulfilled(film, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should update "error" in state with "fetchFilmAction.rejected" action', () => {
    const error = { name: 'error', message: 'error' };

    const initialState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: undefined,
    };

    const expectedState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: 'error',
    };

    const result = filmSlice.reducer(initialState, fetchFilmAction.rejected(error, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should update "comments" in state with "fetchComentsAction.fulfilled" action', () => {
    const initialState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: undefined,
    };

    const comments = generateFilmReviewArr(5);

    const expectedState = {
      film: initialFilm,
      comments: comments,
      similarFilms: [],
      isLoading: false,
      error: undefined,
    };

    const result = filmSlice.reducer(initialState, fetchComentsAction.fulfilled(comments, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should update "similarFilms" in state with "fetchSimilarFilmsAction.fulfilled" action', () => {
    const initialState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: undefined,
    };

    const similarFilms = generateFilmsArray(4);

    const expectedState = {
      film: initialFilm,
      comments: [],
      similarFilms: similarFilms,
      isLoading: false,
      error: undefined,
    };

    const result = filmSlice.reducer(initialState, fetchSimilarFilmsAction.fulfilled(similarFilms, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "true" in state with "sendCommentAction.pending" action', () => {
    const expectedState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: true,
      error: undefined,
    };

    const result = filmSlice.reducer(undefined, sendCommentAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "false" and update "error" message in state with "sendCommentAction.rejected" action', () => {
    const error = { name: 'error', message: 'error' };
    const comment = generateFilmReviewArr(1)[0];

    const expectedState = {
      film: initialFilm,
      comments: [],
      similarFilms: [],
      isLoading: false,
      error: 'error',
    };

    const result = filmSlice.reducer(undefined, sendCommentAction.rejected(error, '', comment));
    expect(result).toEqual(expectedState);
  });

  it('should update "isLoading" to "false" and add new comment in state comments array with "sendCommentAction.fulfilled" action', () => {
    const comment = generateFilmReviewArr(1)[0];

    const expectedState = {
      film: initialFilm,
      comments: [comment],
      similarFilms: [],
      isLoading: false,
      error: undefined,
    };

    const result = filmSlice.reducer(undefined, sendCommentAction.fulfilled(comment, '', comment));
    expect(result).toEqual(expectedState);
  });
});
