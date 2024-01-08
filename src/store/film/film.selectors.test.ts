import { NameSpace } from '../../consts';
import { filmInfo, generateFilmReviewArr, generateFilmsArray } from '../../utils/mock-data';
import { getFilmDetails, getComments, getSimilarFilms, getLoadingStatus, getError } from './selectors';

describe('FilmSlice selectors', () => {
  const state = {
    [NameSpace.Film]: {
      film: filmInfo(),
      comments: generateFilmReviewArr(5),
      similarFilms: generateFilmsArray(4),
      isLoading: false,
      error: undefined,
    }
  };

  it('should return film from state', () => {
    const { film } = state[NameSpace.Film];
    expect(getFilmDetails(state)).toEqual(film);
  });

  it('should return comments array from state', () => {
    const { comments } = state[NameSpace.Film];
    expect(getComments(state)).toEqual(comments);
  });

  it('should return similar films from state', () => {
    const { similarFilms } = state[NameSpace.Film];
    expect(getSimilarFilms(state)).toEqual(similarFilms);
  });

  it('should return loading status from state', () => {
    const { isLoading } = state[NameSpace.Film];
    expect(getLoadingStatus(state)).toEqual(isLoading);
  });

  it('should return errors array status from state', () => {
    const { error } = state[NameSpace.Film];
    expect(getError(state)).toEqual(error);
  });
});
