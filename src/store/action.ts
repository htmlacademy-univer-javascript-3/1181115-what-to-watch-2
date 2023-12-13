import {createAction} from '@reduxjs/toolkit';
import { Film} from '../types';


export const setActiveGenre = createAction<string>('genre/setActiveGenre');

export const setFilms = createAction<Film[]>('genre/setFilms');

export const loadFilms = createAction<Film[]>('list/loadFilms');

export const loadPromo = createAction<Film[]>('list/loadPromo');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
