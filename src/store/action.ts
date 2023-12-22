import {createAction} from '@reduxjs/toolkit';
import { Film, FullFilm, PromoFilm, UserComment, UserData} from '../types';


export const setActiveGenre = createAction<string>('genre/setActiveGenre');

export const loadFilms = createAction<Film[]>('list/loadFilms');
export const loadMyFilms = createAction<Film[]>('list/loadMyFilms');
export const loadPromo = createAction<PromoFilm>('list/loadPromo');
export const loadFullFilm = createAction<FullFilm>('list/loadFullFilm');

export const loadSimilarFilmsById = createAction<Film[]>('list/loadSimilarFilmsById');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
export const setMyFilmsLoadingStatus = createAction<boolean>('data/setMyFilmsLoadingStatus');
export const setAuthLoadingStatus = createAction<boolean>('data/setAuthLoadingStatus');
export const setAuthorizationError = createAction<string | null>('user/setAuthorizationError');
export const setFilmLoadError = createAction<string | null>('user/setFilmLoadError');

export const setUserData = createAction<UserData>('user/setUserData');

export const setAuthorization = createAction<string>('user/setAuthorization');

export const loadComments = createAction<UserComment[]>('user/lodComments');

