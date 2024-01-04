import { NameSpace } from '../../const';
import { Film, PromoFilm } from '../../types';
import { State } from '../state';

export const getIsFilmsLoading = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].isDataLoading;
export const getFilms = (state: Pick<State, NameSpace.Films>): Film[] => state[NameSpace.Films].films;
export const getCurrentGenre = (state: Pick<State, NameSpace.Films>): string => state[NameSpace.Films].genre;
export const getPromoFilm = (state: Pick<State, NameSpace.Films>): PromoFilm => state[NameSpace.Films].promo;
