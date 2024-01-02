import { AxiosInstance } from 'axios';
import { State } from './store/state';

export type Film = {
  id: string;
  name: string;
  genre: string;
  previewVideoLink: string;
  previewImage: string;
};

export type Films = Film[];

export type PromoFilm = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type Review ={
  id: string;
  text: string;
  ratingScore: number;
  author: string;
  date: string;
};

export type FullFilm ={
  id: string;
  name: string;
  genre: string;
  released: number;
  backgroundImage: string;
  posterImage: string;
  runTime: number;
  rating: number;
  scoresCount: number;
  description: string;
  director: string;
  starring: string[];
  reviews: Review[];
};

export type UserComment = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
};

export type AuthData={
  login: string;
  password: string;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
};

export type ErrorType = {
  errorType?: string;
  message?: string;
}

export type AddCommentRequest = {
  filmId: string;
  comment: string;
  rating: number;
}

export type AsyncActionConfig ={
  state: State;
  extra: AxiosInstance;
}
