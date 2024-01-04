import { NameSpace } from '../../const';
import { Film } from '../../types';
import { State } from '../state';

export const getIsMyFilmsLoading = (state: Pick<State, NameSpace.MyFilms>): boolean => state[NameSpace.MyFilms].isMyFilmsLoading;
export const getMyFilms = (state: Pick<State, NameSpace.MyFilms>): Film[] => state[NameSpace.MyFilms].myFilms;
