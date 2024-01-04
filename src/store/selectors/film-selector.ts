import { NameSpace } from '../../const';
import { Film, FullFilm } from '../../types';
import { State } from '../state';

export const getCurrentFilm = (state: Pick<State, NameSpace.Film>): FullFilm | null => state[NameSpace.Film].film;
export const getSimilarFilms = (state: Pick<State, NameSpace.Film>): Film[] => state[NameSpace.Film].similarFilms;
