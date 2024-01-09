import { NameSpace } from '../../consts';
import { generateFilmsArray, promoFilmInfo } from '../../utils/mock-data';
import { getGenre, getFilmsInfo, getLoadingStatus, getPromoFilm } from './selectors';

describe('FilmsSlice selectors', () => {
  const state = {
    [NameSpace.Films]: {
      genre: '',
      films: generateFilmsArray(21),
      isLoading: false,
      promoFilm: promoFilmInfo(),
    }
  };

  it('should return genre from state', () => {
    const { genre } = state[NameSpace.Films];
    expect(getGenre(state)).toEqual(genre);
  });

  it('should return films array from state', () => {
    const { films } = state[NameSpace.Films];
    expect(getFilmsInfo(state)).toEqual(films);
  });

  it('should return loading status from state', () => {
    const { isLoading } = state[NameSpace.Films];
    expect(getLoadingStatus(state)).toEqual(isLoading);
  });

  it('should return promo film from state', () => {
    const { promoFilm } = state[NameSpace.Films];
    expect(getPromoFilm(state)).toEqual(promoFilm);
  });
});
