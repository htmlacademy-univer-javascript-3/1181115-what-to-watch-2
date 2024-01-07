import { store } from '../store';
import { AuthorisationStatus } from '../consts';
import { UserData, FilmCardProps, PromoFilm, LoadableComment, LoadableFilm } from './types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type RedirectSlice = {
  pagePath: string;
}

export type UserSlice = {
  authorisationStatus: AuthorisationStatus;
  user: UserData;
};

export type FilmsSlice = {
  genre: string;
  films: FilmCardProps[];
  isLoading: boolean;
  promoFilm: PromoFilm;
};

export type FilmSlice = {
  film: LoadableFilm;
  comments: LoadableComment[];
  similarFilms: FilmCardProps[];
  isLoading: boolean;
  error: string | undefined;
};

export type MyListSlice = {
  countFilmsInMyList: number;
  filmsInMyList: FilmCardProps[];
  isLoading: boolean;
};

