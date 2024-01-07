import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { LoadableFilm, LoadableComment, FilmCardProps } from '../../types/types';

export const getFilmInfo = (state: Pick<State, NameSpace.Film>): LoadableFilm => state[NameSpace.Film].film;

export const getComments = (state: Pick<State, NameSpace.Film>): LoadableComment[] => state[NameSpace.Film].comments;

export const getSimilarFilms = (state: Pick<State, NameSpace.Film>): FilmCardProps[] => state[NameSpace.Film].similarFilms;

export const getLoadingStatus = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isLoading;

export const getError = (state: Pick<State, NameSpace.Film>): string | undefined => state[NameSpace.Film].error;
