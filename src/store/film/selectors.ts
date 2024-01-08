import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { FullFilm, UserComment, FilmCardProps } from '../../types/types';

export const getFilmDetails = (state: Pick<State, NameSpace.Film>): FullFilm => state[NameSpace.Film].film;

export const getComments = (state: Pick<State, NameSpace.Film>): UserComment[] => state[NameSpace.Film].comments;

export const getSimilarFilms = (state: Pick<State, NameSpace.Film>): FilmCardProps[] => state[NameSpace.Film].similarFilms;

export const getLoadingStatus = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isLoading;

export const getError = (state: Pick<State, NameSpace.Film>): string | undefined => state[NameSpace.Film].error;
