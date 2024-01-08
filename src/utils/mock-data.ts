import * as faker from 'faker';
import { FilmCardProps, UserComment, FullFilm, UserData, PromoFilm, AuthData } from '../types/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AuthorisationStatus } from '../consts';

export const filmReview = (): UserComment => ({
  id: faker.datatype.uuid(),
  date: faker.datatype.datetime().toDateString(),
  user: faker.name.findName(),
  comment: faker.commerce.productDescription(),
  rating: faker.datatype.number({ max: 10 }),
});

export const generateFilmReviewArr = (arrayLength: number): UserComment[] => (
  Array.from({ length: arrayLength }, () => filmReview())
);

export const userInfo = (): UserData => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.imageUrl(),
  email: faker.internet.email(),
  token: faker.datatype.string(),
});

export const filmInfo = (): FullFilm => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  posterImage: faker.image.imageUrl(),
  backgroundImage: faker.image.imageUrl(),
  backgroundColor: faker.internet.color(),
  videoLink: faker.internet.url(),
  description: faker.commerce.productDescription(),
  rating: faker.datatype.number({ max: 10 }),
  scoresCount: faker.datatype.number(),
  director: faker.name.findName(),
  starring: Array.from({ length: Math.random() * 10 + 1}, () => faker.name.findName()),
  runTime: faker.datatype.number(),
  genre: faker.music.genre(),
  released: faker.datatype.number(),
  isFavorite: faker.datatype.boolean(),
});

export const similarFilmInfo = (): FilmCardProps => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  previewVideoLink: faker.internet.url(),
  previewImage: faker.image.imageUrl(),
  genre: faker.music.genre(),

});

export const generateFilmsArray = (arrayLength: number): FilmCardProps[] => (
  Array.from({ length: arrayLength }, () => similarFilmInfo())
);

export const promoFilmInfo = (): PromoFilm => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  posterImage: faker.image.imageUrl(),
  backgroundImage: faker.image.imageUrl(),
  videoLink: faker.internet.url(),
  genre: faker.music.genre(),
  released: faker.datatype.number(),
  isFavorite: faker.datatype.boolean(),
});

export const userAuthData = (): AuthData => ({
  login: faker.internet.email(),
  password: faker.internet.password()
});

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorisationStatus: AuthorisationStatus.NoAuth,
    user: userInfo()
  },
  FILMS: {
    films: [],
    genre: '',
    isLoading: false,
    promoFilm: filmInfo()
  },
  FILM: {
    film: filmInfo(),
    comments: [],
    similarFilms: [],
    isLoading: false,
    error: undefined
  },
  MY_LIST: {
    countFilmsInMyList: 0,
    filmsInMyList: [],
    isLoading: false,
  },
  ...initialState ?? {},
});
