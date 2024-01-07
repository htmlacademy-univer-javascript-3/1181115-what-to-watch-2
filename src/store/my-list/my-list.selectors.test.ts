import { NameSpace } from '../../consts';
import { generateFilmsArray } from '../../utils/mock-data';
import { getCountFilmsInMyList, getFilmsInMyList, getLoadingState } from './selectors';

describe('MyListSlice selectors', () => {
  const state = {
    [NameSpace.MyList]: {
      countFilmsInMyList: 5,
      filmsInMyList: generateFilmsArray(5),
      isLoading: false,
    }
  };

  it('should return count films in my list from state', () => {
    const { countFilmsInMyList } = state[NameSpace.MyList];
    expect(getCountFilmsInMyList(state)).toEqual(countFilmsInMyList);
  });

  it('should return films array in my list array from state', () => {
    const { filmsInMyList } = state[NameSpace.MyList];
    expect(getFilmsInMyList(state)).toEqual(filmsInMyList);
  });

  it('should return loading status from state', () => {
    const { isLoading } = state[NameSpace.MyList];
    expect(getLoadingState(state)).toEqual(isLoading);
  });
});
