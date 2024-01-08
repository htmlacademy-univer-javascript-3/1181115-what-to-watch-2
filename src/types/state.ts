import { store } from '../store';
import { AuthorisationStatus } from '../consts';
import { UserData, FilmCardProps, PromoFilm, UserComment, FullFilm } from './types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

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
  film: FullFilm;
  comments: UserComment[];
  similarFilms: FilmCardProps[];
  isLoading: boolean;
  error: string | undefined;
};

export type MyListSlice = {
  countFilmsInMyList: number;
  filmsInMyList: FilmCardProps[];
  isLoading: boolean;
};

