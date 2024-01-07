import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { FilmCardProps, PromoFilm } from '../../types/types';

export const getFilmsInfo = (state: Pick<State, NameSpace.Films>): FilmCardProps[] => state[NameSpace.Films].films;

export const getGenre = (state: Pick<State, NameSpace.Films>): string => state[NameSpace.Films].genre;

export const getLoadingStatus = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].isLoading;

export const getPromoFilm = (state: Pick<State, NameSpace.Films>): PromoFilm => state[NameSpace.Films].promoFilm;
