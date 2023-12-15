import {createAction} from '@reduxjs/toolkit';
import { Film, PromoFilm, UserData} from '../types';


export const setActiveGenre = createAction<string>('genre/setActiveGenre');

export const loadFilms = createAction<Film[]>('list/loadFilms');

export const loadPromo = createAction<PromoFilm>('list/loadPromo');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const setUserData = createAction<UserData>('user/setUserData');

export const setAuthorization = createAction<string>('user/setAuthorization');

export const setAuthorizationError = createAction<string | null>('user/setAuthorizationError');
