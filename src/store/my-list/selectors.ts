import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { FilmCardProps } from '../../types/types';

export const getCountFilmsInMyList = (state: Pick<State, NameSpace.MyList>): number => state[NameSpace.MyList].countFilmsInMyList;

export const getFilmsInMyList = (state: Pick<State, NameSpace.MyList>): FilmCardProps[] => state[NameSpace.MyList].filmsInMyList;

export const getLoadingState = (state: Pick<State, NameSpace.MyList>): boolean => state[NameSpace.MyList].isLoading;

